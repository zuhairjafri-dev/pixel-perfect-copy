import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: pageTitle("Privacy Policy") },
      { name: "description", content: `How ${brand.name} collects, uses and protects your personal information.` },
      { property: "og:title", content: pageTitle("Privacy Policy") },
      { property: "og:description", content: `${brand.name} privacy policy.` },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="Draft — to be reviewed by a qualified legal professional before launch." />
      <Prose>
        <h2>What we collect</h2>
        <p>Only what is needed to run the marketplace: your name, contact details you choose to share, and the details of cars you list or enquire about.</p>
        <h2>How we use it</h2>
        <p>To publish listings, pass enquiries between buyers and sellers, and keep the platform safe. We do not sell your personal data.</p>
        <h2>Who can see it</h2>
        <p>Your phone number and email are never shown publicly. Sellers see enquiries made on their own listings only.</p>
        <h2>Your rights</h2>
        <p>You can ask us to correct or delete your data at any time by emailing <a href={`mailto:${brand.supportEmail}`} className="underline">{brand.supportEmail}</a>, in line with India's Digital Personal Data Protection Act, 2023.</p>
      </Prose>
    </>
  ),
});
