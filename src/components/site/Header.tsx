import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/cars", label: "Buy Cars" },
  { to: "/sell", label: "Sell Your Car" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/95 text-ink-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
              activeProps={{ className: "text-sm !text-gold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/sell" className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition hover:bg-gold-soft md:inline-flex">
          Sell to us
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink-line px-5 py-4 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2.5 text-ink-muted hover:text-ink-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
