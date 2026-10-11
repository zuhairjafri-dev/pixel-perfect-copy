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
        <p>{brand.name} is a marketplace for pre-owned cars in India, built for people who want a clear, honest way to buy or sell a car.</p>
        <h2>What we believe</h2>
        <ul>
          <li>Prices and specifications should be shown upfront.</li>
          <li>Buyers and sellers should be able to talk to each other directly.</li>
          <li>Personal information should be protected, not sold.</li>
        </ul>
        <h2>What we don't do</h2>
        <p>We don't inspect vehicles, offer warranties or hold payments. Always verify a car and its documents in person before you buy.</p>
      </Prose>
    </>
  ),
});
