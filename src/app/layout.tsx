import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/consts";
import SmoothScroll from "@/components/SmoothScroll.jsx";
import "@/styles/global.css";

const inter = localFont({
  src: "../assets/fonts/inter-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <style href="lumos-layers" precedence="lumos-layers">{`@layer base, patterns, components, utilities;`}</style>
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var page=document.querySelector(".lumos-page");if(!page)return;var r=document.documentElement;["theme-light","theme-dark","theme-brand"].forEach(function(c){r.classList.remove(c);if(page.classList.contains(c))r.classList.add(c)})})();`,
          }}
        />
      </body>
    </html>
  );
}
