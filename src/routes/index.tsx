import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MessageCircle, Search, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { CarCard } from "@/components/site/CarCard";
import { brand, pageTitle } from "@/config/brand";
import { brands, cars } from "@/data/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle() },
      { name: "description", content: brand.seo.description },
      { property: "og:title", content: pageTitle() },
      { property: "og:description", content: brand.seo.description },
    ],
  }),
  component: Home,
});

const prices = [
  { label: "Any budget", value: "" },
  { label: "Under ₹5 Lakh", value: "500000" },
  { label: "Under ₹10 Lakh", value: "1000000" },
  { label: "Under ₹15 Lakh", value: "1500000" },
  { label: "Under ₹25 Lakh", value: "2500000" },
];

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState({ brand: "", model: "", maxPrice: "" });
  const featured = cars.filter((c) => c.featured);
  const recent = [...cars].sort((a, b) => a.listedDaysAgo - b.listedDaysAgo).slice(0, 4);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/cars",
      search: {
        brand: q.brand || undefined,
        q: q.model.trim() || undefined,
        maxPrice: q.maxPrice ? Number(q.maxPrice) : undefined,
      },
    });
  };

  const field = "w-full rounded-md border border-ink-line bg-ink/60 px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-gold";

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="bg-hero-fade absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 md:pb-28 md:pt-36">
          <p className="eyebrow fade-up">Pre-owned cars · India</p>
          <h1 className="fade-up mt-4 max-w-2xl text-5xl leading-[1.05] md:text-7xl">
            {brand.tagline.replace(/\.$/, "")}<span className="text-gold">.</span>
          </h1>
          <p className="fade-up mt-5 max-w-lg text-ink-muted">
            Browse quality used cars from individual owners and dealers. Talk to sellers directly — no middlemen, no surprises.
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3">
            <Link to="/cars" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-soft">
              Buy cars <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/sell" className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/30 px-6 py-3 text-sm font-semibold transition hover:border-gold hover:text-gold">
              Sell your car
            </Link>
          </div>

          <form onSubmit={submit} className="fade-up mt-14 grid max-w-3xl gap-3 rounded-xl border border-ink-line bg-ink/70 p-4 backdrop-blur md:grid-cols-[1fr_1fr_1fr_auto]" aria-label="Search cars">
            <select aria-label="Brand" className={field} value={q.brand} onChange={(e) => setQ({ ...q, brand: e.target.value })}>
              <option value="">All brands</option>
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
            <input aria-label="Model" placeholder="Model, e.g. Creta" maxLength={60} className={field} value={q.model} onChange={(e) => setQ({ ...q, model: e.target.value })} />
            <select aria-label="Budget" className={field} value={q.maxPrice} onChange={(e) => setQ({ ...q, maxPrice: e.target.value })}>
              {prices.map((p) => <option key={p.label} value={p.value}>{p.label}</option>)}
            </select>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-soft">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
        </div>
      </section>

      <Section eyebrow="Handpicked" title="Featured cars" link>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((c) => <CarCard key={c.id} car={c} />)}</div>
      </Section>

      <section className="border-y bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="eyebrow">Browse by</p>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl">Popular brands</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {brands.map((b) => (
                  <Link key={b} to="/cars" search={{ brand: b }} className="rounded-full border bg-card px-4 py-2 text-sm transition hover:border-gold">{b}</Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl">Body type</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["Hatchback", "Sedan", "SUV", "MUV"] as const).map((b) => (
                  <Link key={b} to="/cars" search={{ body: b }} className="rounded-full border bg-card px-4 py-2 text-sm transition hover:border-gold">{b}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Just in" title="Recently listed" link>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{recent.map((c) => <CarCard key={c.id} car={c} />)}</div>
      </Section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">For buyers</p>
            <h2 className="mt-3 text-4xl">How buying works</h2>
            <Steps items={["Browse listings and shortlist cars you like.", "Contact the seller by enquiry, call or WhatsApp.", "Book a test drive and inspect the car in person.", "Agree the price and complete paperwork with the seller."]} />
          </div>
          <div>
            <p className="eyebrow">For sellers</p>
            <h2 className="mt-3 text-4xl">How selling works</h2>
            <Steps items={["Create a free account and add your car's details.", "Upload clear photos and submit for review.", "Once approved, your listing goes live.", "Receive enquiries directly from interested buyers."]} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Why {brand.name}</p>
        <h2 className="mt-3 max-w-xl text-4xl">Built on transparency</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { icon: BadgeCheck, t: "Reviewed listings", d: "Every listing is checked by our team before it is published." },
            { icon: MessageCircle, t: "Direct contact", d: "Speak to sellers yourself on WhatsApp or phone." },
            { icon: Wallet, t: "Free for sellers", d: "List your car at no cost during our launch period." },
            { icon: ShieldCheck, t: "Privacy first", d: "Your phone number is never shown publicly without consent." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border bg-card p-6">
              <Icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-lg border border-dashed bg-secondary p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Safety tip:</strong> Always inspect the car and verify the RC, insurance and service history in person before paying. {brand.name} does not inspect vehicles or hold payments.
        </p>
      </section>

      <section className="border-t bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl">Have questions?</h2>
            <p className="mt-2 text-muted-foreground">Testimonials will appear here once we have genuine customer reviews.</p>
          </div>
          <Link to="/faq" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Read the FAQs</Link>
        </div>
      </section>
    </>
  );
}

function Section({ eyebrow, title, link, children }: { eyebrow: string; title: string; link?: boolean; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 text-4xl">{title}</h2></div>
        {link && <Link to="/cars" className="hidden items-center gap-1 text-sm font-semibold hover:text-gold sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>}
      </div>
      {children}
    </section>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="mt-8 space-y-5">
      {items.map((s, i) => (
        <li key={s} className="flex gap-4">
          <span className="font-display text-3xl text-gold">0{i + 1}</span>
          <span className="pt-2 text-ink-muted">{s}</span>
        </li>
      ))}
    </ol>
  );
}
