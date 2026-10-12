import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: pageTitle("About Us") },
      { name: "description", content: `Why ${brand.name} exists and how we make buying and selling used cars in India simpler.` },
      { property: "og:title", content: pageTitle("About Us") },
      { property: "og:description", content: `The story and principles behind ${brand.name}.` },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About us" title={`Why ${brand.name}`} intro={brand.tagline} />
      <Prose>
        <p>{brand.name} is an independent pre-owned car dealership in India. Every car on this website is from our own inventory — we don't list cars from other sellers.</p>
        <h2>What we believe</h2>
        <ul>
          <li>Prices and specifications should be shown upfront.</li>
          <li>You should be able to talk to a real person quickly.</li>
          <li>Personal information should be protected, not sold.</li>
        </ul>
        <h2>Before you buy</h2>
        <p>We encourage every buyer to see the car in person and check its RC, insurance and service history before paying.</p>
      </Prose>
    </>
  ),
});
