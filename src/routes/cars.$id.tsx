import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Fuel, Gauge, MapPin, MessageCircle, Phone, Settings2, Users } from "lucide-react";
import { useState } from "react";
import { CarCard } from "@/components/site/CarCard";
import { brand, pageTitle } from "@/config/brand";
import { cars, getCar } from "@/data/cars";
import { formatINR, formatKm, formatLakh, ownerLabel, whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/cars/$id")({
  loader: ({ params }) => {
    const car = getCar(params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: pageTitle("Car not found") }, { name: "robots", content: "noindex" }] };
    const c = loaderData.car;
    const t = pageTitle(`${c.year} ${c.brand} ${c.model} in ${c.city}`);
    const d = `${c.year} ${c.brand} ${c.model} ${c.variant} — ${formatLakh(c.price)}, ${formatKm(c.km)}, ${c.fuel}, ${c.transmission}.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: CarNotFound,
  component: CarDetail,
});

function CarNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-5xl">This car isn't available</h1>
      <p className="mt-3 text-muted-foreground">It may have been sold or removed.</p>
      <Link to="/cars" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Browse cars</Link>
    </div>
  );
}

function CarDetail() {
  const { car } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const title = `${car.year} ${car.brand} ${car.model} ${car.variant}`;
  const wa = whatsappLink(`Hi, I'm interested in the ${title} listed at ${formatINR(car.price)} on ${brand.name} (ref: ${car.id}). Is it still available?`);
  const testDrive = whatsappLink(`Hi, I'd like to request a test drive for the ${title} (ref: ${car.id}) on ${brand.name}. My preferred date is: `);
  const related = cars.filter((c) => c.id !== car.id && (c.body === car.body || c.brand === car.brand)).slice(0, 3);

  const specs = [
    { icon: Calendar, l: "Year", v: car.year },
    { icon: Gauge, l: "Driven", v: formatKm(car.km) },
    { icon: Fuel, l: "Fuel", v: car.fuel },
    { icon: Settings2, l: "Transmission", v: car.transmission },
    { icon: Users, l: "Ownership", v: ownerLabel(car.owners) },
    { icon: MapPin, l: "Registration", v: `${car.registration} · ${car.city}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/cars" className="hover:text-foreground">Buy cars</Link> / <span>{car.brand} {car.model}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-xl bg-muted">
            <img src={car.images[active]} alt={`${title} photo ${active + 1}`} width={1280} height={864} className="aspect-[3/2] w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-foreground">Demo listing</span>
          </div>
          <div className="mt-3 flex gap-3">
            {car.images.map((src, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}
                className={`overflow-hidden rounded-md border-2 ${i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={src} alt="" loading="lazy" className="h-16 w-24 object-cover" />
              </button>
            ))}
          </div>
          <section className="mt-10">
            <h2 className="text-3xl">Overview</h2>
            <p className="mt-3 text-muted-foreground">{car.description}</p>
            <h2 className="mt-10 text-3xl">Features</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {car.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{f}</li>)}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <p className="text-sm text-muted-foreground">{car.variant}</p>
            <h1 className="mt-1 text-4xl">{car.year} {car.brand} {car.model}</h1>
            <p className="mt-4 text-3xl font-semibold">{formatINR(car.price)}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t pt-6">
              {specs.map(({ icon: Icon, l, v }) => (
                <div key={l}><dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{l}</dt><dd className="mt-1 text-sm font-medium">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-6 space-y-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-soft">
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold hover:border-gold">
                <Phone className="h-4 w-4" /> Call {brand.name}
              </a>
              <a href={testDrive} target="_blank" rel="noopener noreferrer" className="block text-center text-sm font-semibold underline-offset-4 hover:underline">Request a test drive</a>
            </div>
            <div className="mt-6 border-t pt-4 text-sm">
              <p className="text-muted-foreground">Sold by</p>
              <p className="font-medium">{brand.name} · {brand.address}</p>
              <p className="mt-1 text-xs text-muted-foreground">Stock ref: {car.id}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Sample listing shown while our real inventory is being uploaded. Details and price are illustrative.</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-4xl">Similar cars</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((c) => <CarCard key={c.id} car={c} />)}</div>
        </section>
      )}
    </div>
  );
}
