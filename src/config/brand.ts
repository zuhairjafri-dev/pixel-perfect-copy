// Central brand configuration. In Phase 5 these values become admin-editable
// (stored in the database); this file stays as the fallback default.
export const brand = {
  name: "CarNexa",
  tagline: "Your Next Car, Made Easy.",
  domain: "CarNexa.in",
  // PLACEHOLDER contact details — replace with real ones before launch.
  supportEmail: "hello@carnexa.in",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, country code first
  address: "Bengaluru, Karnataka, India",
  hours: "Mon–Sat, 10:00–19:00 IST",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  seo: {
    description:
      "CarNexa is an independent premium pre-owned car dealership in India. Browse our own handpicked inventory, enquire on WhatsApp and book a showroom visit or test drive.",
  },
  currency: "INR",
  locale: "en-IN",
} as const;

export const pageTitle = (page?: string) =>
  page ? `${page} — ${brand.name}` : `${brand.name} — ${brand.tagline}`;
