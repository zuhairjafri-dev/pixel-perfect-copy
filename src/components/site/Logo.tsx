import { Link } from "@tanstack/react-router";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={`${brand.name} home`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path d="M44 22a14 14 0 1 0 0 20" fill="none" className="stroke-gold" strokeWidth="5" strokeLinecap="round" />
        <path d="M30 32h20" className="stroke-current" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-2xl font-semibold tracking-wide">
        Car<span className="text-gold">Nexa</span>
      </span>
    </Link>
  );
}
