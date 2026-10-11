import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";
import { whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("Contact Us") },
      { name: "description", content: `Get in touch with ${brand.name} by phone, WhatsApp or email.` },
      { property: "og:title", content: pageTitle("Contact Us") },
      { property: "og:description", content: `Reach the ${brand.name} team.` },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, l: "Call", v: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, l: "WhatsApp", v: "Chat with us", href: whatsappLink(`Hi ${brand.name}, I have a question.`) },
    { icon: Mail, l: "Email", v: brand.supportEmail, href: `mailto:${brand.supportEmail}` },
    { icon: MapPin, l: "Location", v: brand.address },
    { icon: Clock, l: "Hours", v: brand.hours },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="We're here to help" intro="Questions about a listing or selling your car? Reach us any way you like." />
      <div className="mx-auto grid max-w-5xl gap-5 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, l, v, href }) => {
          const body = (<><Icon className="h-5 w-5 text-gold" /><p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{l}</p><p className="mt-1 font-medium">{v}</p></>);
          return href ? (
            <a key={l} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-xl border bg-card p-6 transition hover:border-gold">{body}</a>
          ) : (<div key={l} className="rounded-xl border bg-card p-6">{body}</div>);
        })}
      </div>
    </>
  );
}
