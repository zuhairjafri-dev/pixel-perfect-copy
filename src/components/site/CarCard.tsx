import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatKm, formatLakh, ownerLabel } from "@/lib/format";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link to="/cars/$id" params={{ id: car.id }}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={car.images[0]} alt={`${car.year} ${car.brand} ${car.model}`} loading="lazy" width={1280} height={960}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-sm bg-ink/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-foreground">
          Sample listing
        </span>
        <span className="absolute bottom-3 left-3 rounded-sm bg-card/90 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          {car.year} · {car.body}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.65rem]">{car.brand}</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="text-2xl leading-tight">{car.model}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-gold" />
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{car.variant}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-xs">
          <div><dt className="text-muted-foreground">Driven</dt><dd className="mt-0.5 font-medium">{formatKm(car.km)}</dd></div>
          <div><dt className="text-muted-foreground">Fuel</dt><dd className="mt-0.5 font-medium">{car.fuel}</dd></div>
          <div><dt className="text-muted-foreground">Gearbox</dt><dd className="mt-0.5 font-medium">{car.transmission === "Automatic" ? "Auto" : "Manual"}</dd></div>
        </dl>
        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="font-display text-2xl font-semibold">{formatLakh(car.price)}</p>
          <p className="text-xs text-muted-foreground">{ownerLabel(car.owners)}</p>
        </div>
      </div>
    </Link>
  );
}
