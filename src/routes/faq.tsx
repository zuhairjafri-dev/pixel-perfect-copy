import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: pageTitle("FAQs") },
      { name: "description", content: `Answers to common questions about buying and selling used cars on ${brand.name}.` },
      { property: "og:title", content: pageTitle("FAQs") },
      { property: "og:description", content: `Common questions about ${brand.name}.` },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["Is it free to list my car?", "Yes. Listing is free during our launch period."],
  [`Does ${brand.name} inspect cars?`, "No. We review listing details for accuracy, but we do not physically inspect vehicles. Always inspect the car yourself or with a trusted mechanic."],
  ["How do I contact a seller?", "Use the WhatsApp or call buttons on any car page. Website enquiries and test-drive requests will also be saved to your account once accounts launch."],
  ["Do I need an account to browse?", "No. Anyone can browse listings. An account is only needed to list a car, save favourites or track enquiries."],
  ["Do you handle payments?", "Not at the moment. Price and payment are agreed directly between buyer and seller. Never pay before seeing the car and its documents."],
  ["Which documents should I check?", "Registration Certificate (RC), valid insurance, PUC certificate, service history and, for loans, a bank NOC."],
] as const;

function Faq() {
  return (
    <>
      <PageHeader eyebrow="FAQs" title="Frequently asked questions" />
      <div className="mx-auto max-w-3xl px-5 py-14">
        <Accordion type="single" collapsible>
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
