// REFERENCE CATALOGUE — manufacturer and model names used only to power the
// brand/model selectors. It does NOT mean a car is in stock; real availability
// always comes from inventory listings (src/data/cars.ts today).
// Not exhaustive. To extend: add a brand object or append model names.

export type BrandGroup = "India & mainstream" | "Luxury" | "Sports & supercar" | "Electric";

export interface CatalogueBrand {
  name: string;
  group: BrandGroup;
  models: string[];
}

export const OTHER = "__other__";
export const OTHER_BRAND_LABEL = "Other / not listed";
export const OTHER_MODEL_LABEL = "Other / model not listed";

export const catalogue: CatalogueBrand[] = [
  // India & mainstream
  { name: "Maruti Suzuki", group: "India & mainstream", models: ["Alto", "Alto K10", "S-Presso", "Celerio", "Wagon R", "Swift", "Dzire", "Baleno", "Ignis", "Fronx", "Brezza", "Grand Vitara", "Ertiga", "XL6", "Ciaz", "Jimny", "Invicto", "Eeco", "Ritz", "Omni", "Gypsy", "SX4", "Zen", "800"] },
  { name: "Hyundai", group: "India & mainstream", models: ["Santro", "Grand i10", "Grand i10 Nios", "i20", "i20 N Line", "Aura", "Xcent", "Exter", "Venue", "Creta", "Alcazar", "Verna", "Elantra", "Tucson", "Kona Electric", "Ioniq 5", "Eon"] },
  { name: "Tata", group: "India & mainstream", models: ["Tiago", "Tiago EV", "Tigor", "Tigor EV", "Altroz", "Punch", "Punch EV", "Nexon", "Nexon EV", "Curvv", "Curvv EV", "Harrier", "Safari", "Hexa", "Nano", "Indica", "Indigo", "Zest", "Bolt"] },
  { name: "Mahindra", group: "India & mainstream", models: ["KUV100", "XUV300", "XUV 3XO", "XUV400", "Bolero", "Bolero Neo", "Thar", "Thar Roxx", "Scorpio", "Scorpio-N", "Scorpio Classic", "XUV500", "XUV700", "Marazzo", "BE 6", "XEV 9e", "TUV300", "Xylo"] },
  { name: "Toyota", group: "India & mainstream", models: ["Glanza", "Urban Cruiser Hyryder", "Urban Cruiser Taisor", "Rumion", "Innova", "Innova Crysta", "Innova Hycross", "Fortuner", "Fortuner Legender", "Camry", "Corolla Altis", "Etios", "Etios Liva", "Yaris", "Hilux", "Land Cruiser", "Vellfire"] },
  { name: "Honda", group: "India & mainstream", models: ["Brio", "Jazz", "Amaze", "City", "City Hybrid", "Elevate", "WR-V", "BR-V", "Civic", "Accord", "CR-V", "Mobilio"] },
  { name: "Kia", group: "India & mainstream", models: ["Sonet", "Seltos", "Carens", "Syros", "Carnival", "EV6", "EV9"] },
  { name: "Skoda", group: "India & mainstream", models: ["Kylaq", "Kushaq", "Slavia", "Rapid", "Octavia", "Superb", "Kodiaq", "Fabia", "Laura", "Yeti"] },
  { name: "Volkswagen", group: "India & mainstream", models: ["Polo", "Vento", "Virtus", "Taigun", "Tiguan", "T-Roc", "Ameo", "Jetta", "Passat", "Golf"] },
  { name: "Renault", group: "India & mainstream", models: ["Kwid", "Triber", "Kiger", "Duster", "Captur", "Lodgy", "Pulse", "Scala", "Fluence"] },
  { name: "Nissan", group: "India & mainstream", models: ["Magnite", "Kicks", "Terrano", "Sunny", "Micra", "X-Trail", "GT-R"] },
  { name: "MG", group: "India & mainstream", models: ["Comet EV", "Astor", "Hector", "Hector Plus", "ZS EV", "Windsor EV", "Gloster", "Cyberster", "M9"] },
  { name: "Jeep", group: "India & mainstream", models: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"] },
  { name: "Citroën", group: "India & mainstream", models: ["C3", "eC3", "C3 Aircross", "Basalt", "C5 Aircross"] },
  { name: "Ford", group: "India & mainstream", models: ["Figo", "Aspire", "Freestyle", "EcoSport", "Endeavour", "Fiesta", "Ikon", "Mustang", "Ranger", "F-150"] },
  { name: "Chevrolet", group: "India & mainstream", models: ["Beat", "Spark", "Sail", "Cruze", "Enjoy", "Tavera", "Trailblazer", "Captiva", "Camaro", "Corvette"] },
  { name: "Fiat", group: "India & mainstream", models: ["Punto", "Linea", "Avventura", "Palio", "500"] },
  { name: "Peugeot", group: "India & mainstream", models: ["208", "308", "2008", "3008", "5008"] },
  { name: "Mitsubishi", group: "India & mainstream", models: ["Pajero", "Pajero Sport", "Outlander", "Lancer", "Cedia", "Montero"] },
  { name: "Suzuki", group: "India & mainstream", models: ["Swift", "Vitara", "Jimny", "S-Cross"] },
  { name: "Isuzu", group: "India & mainstream", models: ["D-Max V-Cross", "MU-X", "Hi-Lander"] },
  { name: "Subaru", group: "India & mainstream", models: ["Forester", "Outback", "XV / Crosstrek", "Impreza", "WRX", "BRZ"] },
  { name: "Mazda", group: "India & mainstream", models: ["Mazda2", "Mazda3", "CX-3", "CX-5", "CX-30", "MX-5"] },
  { name: "Datsun", group: "India & mainstream", models: ["redi-GO", "GO", "GO+"] },
  { name: "Force Motors", group: "India & mainstream", models: ["Gurkha", "Trax", "Urbania"] },

  // Luxury
  { name: "BMW", group: "Luxury", models: ["1 Series", "2 Series Gran Coupe", "3 Series", "3 Series Gran Limousine", "5 Series", "6 Series GT", "7 Series", "X1", "X3", "X5", "X7", "Z4", "M2", "M3", "M4", "M5", "iX", "iX1", "i4", "i5", "i7"] },
  { name: "Mercedes-Benz", group: "Luxury", models: ["A-Class Limousine", "C-Class", "E-Class", "S-Class", "CLA", "GLA", "GLB", "GLC", "GLC Coupe", "GLE", "GLS", "G-Class", "Maybach S-Class", "Maybach GLS", "AMG GT", "EQA", "EQB", "EQE", "EQS"] },
  { name: "Audi", group: "Luxury", models: ["A3", "A4", "A6", "A8", "Q2", "Q3", "Q3 Sportback", "Q5", "Q7", "Q8", "RS 5", "RS Q8", "e-tron", "Q8 e-tron", "e-tron GT", "R8"] },
  { name: "Volvo", group: "Luxury", models: ["S60", "S90", "XC40", "XC40 Recharge", "C40 Recharge", "EX40", "XC60", "XC90", "V40"] },
  { name: "Lexus", group: "Luxury", models: ["ES", "IS", "LS", "NX", "RX", "LX", "LM"] },
  { name: "Jaguar", group: "Luxury", models: ["XE", "XF", "XJ", "F-Pace", "E-Pace", "I-Pace", "F-Type"] },
  { name: "Land Rover", group: "Luxury", models: ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Freelander 2"] },
  { name: "MINI", group: "Luxury", models: ["Cooper 3-Door", "Cooper 5-Door", "Cooper Convertible", "Countryman", "Cooper SE", "John Cooper Works"] },
  { name: "Genesis", group: "Luxury", models: ["G70", "G80", "G90", "GV60", "GV70", "GV80"] },
  { name: "Bentley", group: "Luxury", models: ["Continental GT", "Flying Spur", "Bentayga", "Mulsanne"] },
  { name: "Rolls-Royce", group: "Luxury", models: ["Ghost", "Phantom", "Cullinan", "Wraith", "Dawn", "Spectre"] },

  // Sports & supercar
  { name: "Porsche", group: "Sports & supercar", models: ["718 Boxster", "718 Cayman", "911", "Panamera", "Macan", "Macan Electric", "Cayenne", "Cayenne Coupe", "Taycan"] },
  { name: "Lamborghini", group: "Sports & supercar", models: ["Huracán", "Urus", "Aventador", "Revuelto", "Temerario"] },
  { name: "Ferrari", group: "Sports & supercar", models: ["Roma", "Portofino", "296 GTB", "F8 Tributo", "SF90 Stradale", "812 Superfast", "Purosangue", "12Cilindri"] },
  { name: "Aston Martin", group: "Sports & supercar", models: ["Vantage", "DB11", "DB12", "DBS", "DBX"] },
  { name: "McLaren", group: "Sports & supercar", models: ["GT", "Artura", "570S", "720S", "750S"] },
  { name: "Maserati", group: "Sports & supercar", models: ["Ghibli", "Quattroporte", "Levante", "Grecale", "MC20", "GranTurismo"] },
  { name: "Lotus", group: "Sports & supercar", models: ["Emira", "Eletre", "Evora", "Elise"] },

  // Electric
  { name: "Tesla", group: "Electric", models: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"] },
  { name: "BYD", group: "Electric", models: ["Atto 3", "Seal", "e6", "eMax 7", "Sealion 7", "Dolphin"] },
  { name: "VinFast", group: "Electric", models: ["VF 6", "VF 7", "VF 8", "VF 9"] },
  { name: "Polestar", group: "Electric", models: ["Polestar 2", "Polestar 3", "Polestar 4"] },
  { name: "Rivian", group: "Electric", models: ["R1T", "R1S", "R2"] },
  { name: "Lucid", group: "Electric", models: ["Air", "Gravity"] },
];

export const brandGroups: BrandGroup[] = ["India & mainstream", "Luxury", "Sports & supercar", "Electric"];

const norm = (s: string) => s.toLowerCase().trim();

export const findBrand = (name?: string) =>
  name ? catalogue.find((b) => norm(b.name) === norm(name)) : undefined;

/** Catalogue models for a brand, plus any inventory-only models so real stock is always selectable. */
export const modelsForBrand = (brandName: string | undefined, inventoryModels: string[] = []) => {
  const base = findBrand(brandName)?.models ?? [];
  const extra = inventoryModels.filter((m) => !base.some((b) => norm(b) === norm(m)));
  return [...base, ...extra];
};

export const isCatalogueBrand = (name: string) => !!findBrand(name);
