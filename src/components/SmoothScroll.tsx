"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import type { LenisOptions } from "lenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const lenisOptions = {
  autoRaf: false,
  anchors: true,
  autoToggle: true,
  stopInertiaOnNavigate: true,
} satisfies LenisOptions;

function updateScrollTrigger() {
  ScrollTrigger.update();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      // GSAP's ticker reports seconds. Lenis wants milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    // One clock. Lag smoothing lets ScrollTrigger drift behind Lenis.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
      <LenisScrollTrigger />
      {children}
    </ReactLenis>
  );
}

function LenisScrollTrigger() {
  const pathname = usePathname();
  const lenis = useLenis(updateScrollTrigger);

  useEffect(() => {
    if (!lenis) return;

    const frame = window.setTimeout(() => {
      lenis.resize();
      // Next has already moved the viewport. Adopt that position instead of easing back.
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      ScrollTrigger.refresh();
    }, 0);

    return () => window.clearTimeout(frame);
  }, [pathname, lenis]);

  return null;
}
