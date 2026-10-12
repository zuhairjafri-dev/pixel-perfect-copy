import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CarCard } from "@/components/site/CarCard";
import { PageHeader } from "@/components/site/PageHeader";
import { pageTitle } from "@/config/brand";
import { brands, cars, cities } from "@/data/cars";

const searchSchema = z.object({
  brand: z.string().max(40).optional(),
  q: z.string().max(60).optional(),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().positive().optional(),
  minYear: z.number().int().optional(),
  fuel: z.enum(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]).optional(),
  transmission: z.enum(["Manual", "Automatic"]).optional(),
  body: z.enum(["Hatchback", "Sedan", "SUV", "MUV"]).optional(),
  maxKm: z.number().int().positive().optional(),
  owners: z.number().int().min(1).max(5).optional(),
  city: z.string().max(40).optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "km-asc", "year-desc"]).optional(),
  page: z.number().int().min(1).optional(),
});
type Search = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/cars/")({
  validateSearch: (s) => {
    const r = searchSchema.safeParse(s);
    return r.success ? r.data : {};
  },
  head: () => ({
    meta: [
      { title: pageTitle("Buy Used Cars") },
      { name: "description", content: "Browse used cars across India. Filter by brand, budget, fuel, transmission, body type and city." },
      { property: "og:title", content: pageTitle("Buy Used Cars") },
      { property: "og:description", content: "Browse used cars across India by brand, budget, fuel and city." },
    ],
  }),
  component: Browse,
});

const PER_PAGE = 6;

function Browse() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/cars/" });
  const set = (patch: Partial<Search>) => navigate({ search: (prev) => ({ ...prev, ...patch, page: undefined }) });

  const q = s.q?.toLowerCase();
  let list = cars.filter((c) =>
    (!s.brand || c.brand === s.brand) &&
    (!q || `${c.brand} ${c.model} ${c.variant}`.toLowerCase().includes(q)) &&
    (!s.minPrice || c.price >= s.minPrice) && (!s.maxPrice || c.price <= s.maxPrice) &&
    (!s.minYear || c.year >= s.minYear) && (!s.fuel || c.fuel === s.fuel) &&
    (!s.transmission || c.transmission === s.transmission) && (!s.body || c.body === s.body) &&
    (!s.maxKm || c.km <= s.maxKm) && (!s.owners || c.owners <= s.owners) && (!s.city || c.city === s.city));
  const sorters: Record<string, (a: (typeof cars)[0], b: (typeof cars)[0]) => number> = {
    newest: (a, b) => a.listedDaysAgo - b.listedDaysAgo,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "km-asc": (a, b) => a.km - b.km,
    "year-desc": (a, b) => b.year - a.year,
  };
  list = [...list].sort(sorters[s.sort ?? "newest"]);
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const page = Math.min(s.page ?? 1, pages);
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const sel = "w-full rounded-md border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const num = (v: string) => (v ? Number(v) : undefined);

  return (
    <>
      <PageHeader eyebrow="Inventory" title="Our inventory" intro="Our own handpicked inventory. Sample cars are shown while real stock is being uploaded." />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4" aria-label="Filters">
          <input aria-label="Search model" placeholder="Search model" maxLength={60} className={sel} defaultValue={s.q}
            onKeyDown={(e) => e.key === "Enter" && set({ q: (e.target as HTMLInputElement).value.trim() || undefined })}
            onBlur={(e) => set({ q: e.target.value.trim() || undefined })} />
          <Filter label="Brand" value={s.brand} onChange={(v) => set({ brand: v || undefined })} options={brands} cls={sel} />
          <div className="grid grid-cols-2 gap-2">
            <select aria-label="Minimum price" className={sel} value={s.minPrice ?? ""} onChange={(e) => set({ minPrice: num(e.target.value) })}>
              <option value="">Min ₹</option>
              {[300000, 500000, 1000000, 1500000].map((v) => <option key={v} value={v}>₹{v / 100000}L</option>)}
            </select>
            <select aria-label="Maximum price" className={sel} value={s.maxPrice ?? ""} onChange={(e) => set({ maxPrice: num(e.target.value) })}>
              <option value="">Max ₹</option>
              {[500000, 1000000, 1500000, 2500000].map((v) => <option key={v} value={v}>₹{v / 100000}L</option>)}
            </select>
          </div>
          <select aria-label="Year" className={sel} value={s.minYear ?? ""} onChange={(e) => set({ minYear: num(e.target.value) })}>
            <option value="">Any year</option>
            {[2023, 2022, 2020, 2018].map((y) => <option key={y} value={y}>{y} or newer</option>)}
          </select>
          <Filter label="Fuel" value={s.fuel} onChange={(v) => set({ fuel: (v || undefined) as Search["fuel"] })} options={["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]} cls={sel} />
          <Filter label="Transmission" value={s.transmission} onChange={(v) => set({ transmission: (v || undefined) as Search["transmission"] })} options={["Manual", "Automatic"]} cls={sel} />
          <Filter label="Body type" value={s.body} onChange={(v) => set({ body: (v || undefined) as Search["body"] })} options={["Hatchback", "Sedan", "SUV", "MUV"]} cls={sel} />
          <select aria-label="Kilometres" className={sel} value={s.maxKm ?? ""} onChange={(e) => set({ maxKm: num(e.target.value) })}>
            <option value="">Any kilometres</option>
            {[25000, 50000, 75000, 100000].map((k) => <option key={k} value={k}>Under {k / 1000}k km</option>)}
          </select>
          <select aria-label="Owners" className={sel} value={s.owners ?? ""} onChange={(e) => set({ owners: num(e.target.value) })}>
            <option value="">Any owners</option>
            <option value="1">1st owner only</option><option value="2">Up to 2 owners</option>
          </select>
          <Filter label="City" value={s.city} onChange={(v) => set({ city: v || undefined })} options={cities} cls={sel} />
          <Link to="/cars" className="block text-center text-sm text-muted-foreground underline-offset-4 hover:underline">Clear all filters</Link>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{list.length} {list.length === 1 ? "car" : "cars"} found</p>
            <select aria-label="Sort" className="rounded-md border bg-card px-3 py-2 text-sm" value={s.sort ?? "newest"} onChange={(e) => set({ sort: e.target.value as Search["sort"] })}>
              <option value="newest">Newest first</option><option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option><option value="km-asc">Lowest km</option><option value="year-desc">Newest model year</option>
            </select>
          </div>
          {shown.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{shown.map((c) => <CarCard key={c.id} car={c} />)}</div>
          ) : (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <h2 className="text-3xl">No cars match these filters</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try widening your budget or removing a filter.</p>
              <Link to="/cars" className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Reset filters</Link>
            </div>
          )}
          {pages > 1 && (
            <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link key={p} to="/cars" search={(prev) => ({ ...prev, page: p })} aria-current={p === page ? "page" : undefined}
                  className={`h-10 w-10 rounded-full border text-center text-sm leading-10 ${p === page ? "bg-primary text-primary-foreground" : "bg-card hover:border-gold"}`}>{p}</Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

function Filter({ label, value, onChange, options, cls }: { label: string; value?: string | undefined; onChange: (v: string) => void; options: readonly string[]; cls: string }) {
  return (
    <select aria-label={label} className={cls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">Any {label.toLowerCase()}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
