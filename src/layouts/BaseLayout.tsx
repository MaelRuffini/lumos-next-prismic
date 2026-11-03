import type { ReactNode } from "react";
import SkipLink from "@/components/global/SkipLink";
import Nav from "@/components/global/Nav";
import Footer from "@/components/global/Footer";
import ThemeLock from "@/components/ThemeLock";
import { cx } from "@/utils/cx";
import { Styles } from "@/utils/styles";
import type { SeoProps } from "@/types";

type Props = SeoProps & {
  /** Theme for the whole page. `inherit` leaves the root defaults in place. */
  theme?: "inherit" | "light" | "dark" | "brand";
  /**
   * Fix the nav over the page rather than letting it stick in flow, so the
   * first section starts underneath it. Give that section
   * `paddingTop="navoverlap"` to clear the bar.
   */
  overlap?: boolean;
  /** Extra elements hoisted into the document head. */
  head?: ReactNode;
  children?: ReactNode;
};

export default function BaseLayout({
  theme = "inherit",
  overlap = false,
  head,
  children,
}: Props) {
  const themeClass = theme !== "inherit" ? `theme-${theme}` : "";

  return (
    <div className={cx("lumos-page", themeClass)}>
      <Styles id="page" css={pageCss} />
      <ThemeLock theme={theme} />
      {head}
      <SkipLink />
      <Nav overlap={overlap} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const pageCss = `
@layer components {
  .lumos-page {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100svh;
  }
}
`;
