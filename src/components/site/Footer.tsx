import { Link } from "@tanstack/react-router";
import { brand } from "@/config/brand";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-ink-foreground"><Logo /></div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{brand.tagline} A transparent marketplace connecting buyers and sellers of pre-owned cars across India.</p>
        </div>
        <div>
          <h3 className="eyebrow mb-4 font-sans">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cars" className="hover:text-ink-foreground">Buy cars</Link></li>
            <li><Link to="/sell" className="hover:text-ink-foreground">Sell your car</Link></li>
            <li><Link to="/about" className="hover:text-ink-foreground">About us</Link></li>
            <li><Link to="/faq" className="hover:text-ink-foreground">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4 font-sans">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-ink-foreground">{brand.phone}</a></li>
            <li><a href={`mailto:${brand.supportEmail}`} className="hover:text-ink-foreground">{brand.supportEmail}</a></li>
            <li>{brand.address}</li>
            <li><Link to="/contact" className="hover:text-ink-foreground">Contact page</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink-foreground">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
