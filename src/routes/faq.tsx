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
  [`Who sells the cars on ${brand.name}?`, `Every car is from our own ${brand.name} dealership inventory. We don't list cars from other sellers.`],
  ["How do I enquire about a car?", "Use the WhatsApp or call buttons on any car page. Your message includes the car's stock reference so we can help quickly."],
  ["Can I book a test drive?", "Yes. Use \"Request a test drive\" on the car page and we'll confirm a time with you on WhatsApp."],
  ["Can I sell my car to you?", "Yes. Share your car's details on the Sell Your Car page and our team will get back to you."],
  ["How is payment handled?", "Payment is arranged with our team at the showroom. Never pay anyone before seeing the car and its documents."],
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
