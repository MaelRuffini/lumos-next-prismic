import type { Metadata } from "next";
import Layout from "@/layouts/BaseLayout";
import Section from "@/components/wrapper/Section";
import Heading from "@/components/typography/Heading";
import Eyebrow from "@/components/typography/Eyebrow";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import Button from "@/components/Button";
import Img from "@/components/media/Img";
import Icon from "@/components/media/Icon";
import ContentWrapper from "@/components/wrapper/ContentWrapper";
import lumosBackground from "@/assets/graphics/lumos-background.svg";
import logoIcon from "@/assets/logo/logo-icon.svg";
import { pageMetadata } from "@/utils/metadata";

export const metadata: Metadata = pageMetadata({}, "/");

export default function HomePage() {
  return (
    <Layout theme="dark">
      <Section
        paddingBottom="even"
        containerClass="flex-grow"
        paddingTop="even"
        class="flex-grow"
        style={{ minHeight: "calc(100svh - var(--nav-height))" }}
      >
        <ContentWrapper class="flex-grow theme-brand" variant="card" mediaOpacity={100} column2={
          <Img src={lumosBackground} width={1920} height={1080} loading="eager" fetchPriority="high" />
        }>
          <Icon src={logoIcon} variant="large" />
          <Heading variant="display" tag="h1" class="margin-block-8">
            Style Guide
          </Heading>
          <Eyebrow variant="tag">v1.0.2</Eyebrow>
          <ButtonWrapper>
            <Button element="link" href="/style-guide">
              View the guide
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Section>
    </Layout>
  );
}
