import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: pageTitle("Terms & Conditions") },
      { name: "description", content: `The terms that apply when you use ${brand.name}.` },
      { property: "og:title", content: pageTitle("Terms & Conditions") },
      { property: "og:description", content: `${brand.name} terms and conditions.` },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" intro="Draft — to be reviewed by a qualified legal professional before launch." />
      <Prose>
        <h2>The platform</h2>
        <p>{brand.name} is a listing platform. We are not a party to any sale between buyers and sellers.</p>
        <h2>Listings</h2>
        <p>Sellers must provide accurate information and own, or be authorised to sell, the vehicle. We may reject or remove any listing.</p>
        <h2>Buyer responsibility</h2>
        <p>Buyers should inspect vehicles and verify documents before paying. {brand.name} does not guarantee any vehicle's condition.</p>
        <h2>Acceptable use</h2>
        <p>No spam, fraud, scraping or misuse of other users' contact information.</p>
      </Prose>
    </>
  ),
});
