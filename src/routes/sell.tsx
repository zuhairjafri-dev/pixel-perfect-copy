import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/site/PageHeader";
import { brand, pageTitle } from "@/config/brand";
import { whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: pageTitle("Sell Your Car") },
      { name: "description", content: "List your used car for free and reach genuine buyers across India." },
      { property: "og:title", content: pageTitle("Sell Your Car") },
      { property: "og:description", content: "List your used car for free and reach genuine buyers across India." },
    ],
  }),
  component: Sell,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  city: z.string().trim().min(2, "Enter your city").max(40),
  brand: z.string().trim().min(2, "Enter the brand").max(40),
  model: z.string().trim().min(1, "Enter the model").max(60),
  year: z.coerce.number().int().min(1995, "Year looks wrong").max(new Date().getFullYear(), "Year looks wrong"),
  km: z.coerce.number().int().min(0).max(1_000_000, "Kilometres look wrong"),
  price: z.coerce.number().int().min(50_000, "Minimum ₹50,000").max(50_00_00_000),
});

function Sell() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    const d = r.data;
    window.open(whatsappLink(`Hi ${brand.name}, I'd like to sell my car.\nName: ${d.name}\nCity: ${d.city}\nCar: ${d.year} ${d.brand} ${d.model}\nKm: ${d.km}\nExpected price: ₹${d.price}`), "_blank", "noopener,noreferrer");
  };

  const input = "mt-1.5 w-full rounded-md border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const F = ({ n, l, type = "text", ph }: { n: string; l: string; type?: string; ph?: string }) => (
    <label className="block text-sm font-medium">
      {l}
      <input name={n} type={type} placeholder={ph} className={input} aria-invalid={!!errors[n]} />
      {errors[n] && <span className="mt-1 block text-xs text-destructive">{errors[n]}</span>}
    </label>
  );

  return (
    <>
      <PageHeader eyebrow="Sell your car" title="Reach serious buyers" intro="Listing is free. Tell us about your car and our team will help you get it listed." />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {[
            ["Free listing", "No listing fees during our launch period."],
            ["Reviewed before publishing", "Our team checks every listing for accuracy."],
            ["Direct enquiries", "Buyers contact you — you stay in control of the deal."],
            ["Your privacy", "Your phone number is only shared with your consent."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-2 border-gold pl-5"><h2 className="text-2xl">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="rounded-xl border bg-card p-6 shadow-card md:p-8">
          <h2 className="text-3xl">Your car details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Submitting opens WhatsApp with your details prefilled — nothing is stored on this site yet.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <F n="name" l="Your name" /><F n="city" l="City" ph="e.g. Pune" />
            <F n="brand" l="Brand" ph="e.g. Hyundai" /><F n="model" l="Model" ph="e.g. Creta SX" />
            <F n="year" l="Year" type="number" /><F n="km" l="Kilometres driven" type="number" />
            <div className="sm:col-span-2"><F n="price" l="Expected price (₹)" type="number" /></div>
          </div>
          <button className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Send details on WhatsApp</button>
        </form>
      </div>
    </>
  );
}
