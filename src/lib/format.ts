import { brand } from "@/config/brand";

export const formatINR = (n: number) =>
  new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: brand.currency,
    maximumFractionDigits: 0,
  }).format(n);

/** Compact Indian price: 6,50,000 -> ₹6.5 Lakh */
export const formatLakh = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  return `₹${(n / 1_00_000).toFixed(2).replace(/\.?0+$/, "")} Lakh`;
};

export const formatKm = (n: number) => `${new Intl.NumberFormat(brand.locale).format(n)} km`;

export const ownerLabel = (n: number) =>
  n === 1 ? "1st owner" : n === 2 ? "2nd owner" : n === 3 ? "3rd owner" : `${n}th owner`;

export const whatsappLink = (text: string, number: string = brand.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
