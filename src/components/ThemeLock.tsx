"use client";

import { useLayoutEffect } from "react";

const THEMES = ["theme-light", "theme-dark", "theme-brand"] as const;

/** Mirrors the page theme onto `<html>` so the canvas and overscroll match. */
export default function ThemeLock({ theme }: { theme: "inherit" | "light" | "dark" | "brand" }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    if (theme !== "inherit") root.classList.add(`theme-${theme}`);
    return () => root.classList.remove(...THEMES);
  }, [theme]);

  return null;
}
