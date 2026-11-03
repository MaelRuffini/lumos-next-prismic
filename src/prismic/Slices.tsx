import type { SliceZone as SliceZoneField } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Layout from "@/layouts/BaseLayout";
import { components } from "@/slices";

export default function PrismicSlices({ slices }: { slices: SliceZoneField }) {
  return (
    <Layout>
      <SliceZone slices={slices} components={components} />
    </Layout>
  );
}
