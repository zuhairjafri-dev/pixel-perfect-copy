import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatKm, formatLakh } from "@/lib/format";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link to="/cars/$id" params={{ id: car.id }}
      className="group block overflow-hidden rounded-xl border bg-card shadow-card transition hover:-translate-y-1">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <img src={car.images[0]} alt={`${car.year} ${car.brand} ${car.model}`} loading="lazy" width={1280} height={864}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-foreground">
          Demo listing
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground">{car.year} · {car.variant}</p>
        <h3 className="mt-1 text-2xl">{car.brand} {car.model}</h3>
        <p className="mt-2 text-lg font-semibold">{formatLakh(car.price)}</p>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t pt-4 text-xs text-muted-foreground">
          <span>{formatKm(car.km)}</span><span>·</span><span>{car.fuel}</span><span>·</span><span>{car.transmission}</span>
          <span className="ml-auto inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{car.city}</span>
        </div>
      </div>
    </Link>
  );
}
