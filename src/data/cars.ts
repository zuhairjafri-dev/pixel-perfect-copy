import suv from "@/assets/car-suv.jpg";
import sedan from "@/assets/car-sedan.jpg";
import hatch from "@/assets/car-hatch.jpg";
import hero from "@/assets/hero.jpg";

// DEMO CONTENT — clearly labelled sample listings for Phase 1.
// Replaced by database-backed listings in Phase 3. Remove before launch.
export type Fuel = "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
export type Transmission = "Manual" | "Automatic";
export type BodyType = "Hatchback" | "Sedan" | "SUV" | "MUV";

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  km: number;
  fuel: Fuel;
  transmission: Transmission;
  body: BodyType;
  owners: number;
  city: string;
  registration: string;
  images: string[];
  featured?: boolean;
  listedDaysAgo: number;
  description: string;
  features: string[];
  seller: { name: string; type: "Individual" | "Dealer" };
}

const img = { suv, sedan, hatch, hero };

export const cars: Car[] = [
  {
    id: "demo-creta-2021", brand: "Hyundai", model: "Creta", variant: "SX 1.5 Petrol", year: 2021,
    price: 1325000, km: 32500, fuel: "Petrol", transmission: "Manual", body: "SUV", owners: 1,
    city: "Bengaluru", registration: "KA-03", images: [img.suv, img.sedan, img.hatch], featured: true,
    listedDaysAgo: 2,
    description: "Single-owner SUV, driven mostly on city roads. Service records available from the authorised workshop.",
    features: ["Sunroof", "Touchscreen infotainment", "Rear camera", "Cruise control", "Alloy wheels"],
    seller: { name: "Demo Seller — Arjun", type: "Individual" },
  },
  {
    id: "demo-city-2019", brand: "Honda", model: "City", variant: "VX CVT", year: 2019,
    price: 895000, km: 48200, fuel: "Petrol", transmission: "Automatic", body: "Sedan", owners: 1,
    city: "Pune", registration: "MH-12", images: [img.sedan, img.suv], featured: true, listedDaysAgo: 5,
    description: "Smooth CVT automatic sedan with a comfortable cabin. Tyres replaced in 2024.",
    features: ["Automatic climate control", "Paddle shifters", "Keyless entry", "Android Auto"],
    seller: { name: "Demo Dealer — Pune Motors", type: "Dealer" },
  },
  {
    id: "demo-swift-2020", brand: "Maruti Suzuki", model: "Swift", variant: "ZXi", year: 2020,
    price: 585000, km: 39800, fuel: "Petrol", transmission: "Manual", body: "Hatchback", owners: 2,
    city: "Hyderabad", registration: "TS-09", images: [img.hatch, img.sedan], featured: true, listedDaysAgo: 1,
    description: "Fuel-efficient hatchback, ideal for daily commutes. Insurance valid until March 2027.",
    features: ["Power windows", "Bluetooth audio", "ABS with EBD", "Dual airbags"],
    seller: { name: "Demo Seller — Sneha", type: "Individual" },
  },
  {
    id: "demo-xuv700-2022", brand: "Mahindra", model: "XUV700", variant: "AX7 Diesel AT", year: 2022,
    price: 2250000, km: 28000, fuel: "Diesel", transmission: "Automatic", body: "SUV", owners: 1,
    city: "Delhi", registration: "DL-8C", images: [img.hero, img.suv], featured: true, listedDaysAgo: 3,
    description: "Top-variant seven-seater with ADAS. Ceramic coating applied in 2025.",
    features: ["ADAS", "Panoramic sunroof", "7 seats", "360° camera", "Ventilated seats"],
    seller: { name: "Demo Dealer — Capital Cars", type: "Dealer" },
  },
  {
    id: "demo-nexon-ev-2023", brand: "Tata", model: "Nexon EV", variant: "Max XZ+", year: 2023,
    price: 1450000, km: 18500, fuel: "Electric", transmission: "Automatic", body: "SUV", owners: 1,
    city: "Mumbai", registration: "MH-02", images: [img.suv, img.hero], listedDaysAgo: 4,
    description: "Electric compact SUV with home charger included. Battery warranty as per manufacturer terms.",
    features: ["Fast charging", "Connected car", "Ventilated seats", "Wireless charger"],
    seller: { name: "Demo Seller — Rohan", type: "Individual" },
  },
  {
    id: "demo-innova-2018", brand: "Toyota", model: "Innova Crysta", variant: "2.4 GX", year: 2018,
    price: 1575000, km: 92000, fuel: "Diesel", transmission: "Manual", body: "MUV", owners: 2,
    city: "Chennai", registration: "TN-07", images: [img.sedan, img.suv], listedDaysAgo: 9,
    description: "Reliable family MUV with spacious eight-seat configuration.",
    features: ["8 seats", "Rear AC vents", "Touchscreen", "Steering controls"],
    seller: { name: "Demo Dealer — Chennai Auto Hub", type: "Dealer" },
  },
  {
    id: "demo-baleno-2022", brand: "Maruti Suzuki", model: "Baleno", variant: "Alpha CNG", year: 2022,
    price: 765000, km: 26400, fuel: "CNG", transmission: "Manual", body: "Hatchback", owners: 1,
    city: "Ahmedabad", registration: "GJ-01", images: [img.hatch, img.suv], listedDaysAgo: 6,
    description: "Factory-fitted CNG premium hatchback with low running costs.",
    features: ["Head-up display", "360° camera", "Six airbags", "Auto headlamps"],
    seller: { name: "Demo Seller — Kavya", type: "Individual" },
  },
  {
    id: "demo-verna-2021", brand: "Hyundai", model: "Verna", variant: "SX(O) Turbo DCT", year: 2021,
    price: 1195000, km: 35100, fuel: "Petrol", transmission: "Automatic", body: "Sedan", owners: 1,
    city: "Kolkata", registration: "WB-02", images: [img.sedan, img.hatch], listedDaysAgo: 12,
    description: "Turbo-petrol DCT sedan, enthusiast-owned and garage-kept.",
    features: ["Turbo petrol", "Sunroof", "Ventilated seats", "Bose audio"],
    seller: { name: "Demo Seller — Ananya", type: "Individual" },
  },
];

export const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
export const cities = Array.from(new Set(cars.map((c) => c.city))).sort();
export const getCar = (id: string) => cars.find((c) => c.id === id);
