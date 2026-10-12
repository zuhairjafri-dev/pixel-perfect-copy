// Budget presets are search ranges only, never vehicle prices.
export interface BudgetPreset { id: string; label: string; min?: number; max?: number }

const L = 1_00_000;
export const budgetPresets: BudgetPreset[] = [
  { id: "u2", label: "Under ₹2 lakh", max: 2 * L },
  { id: "2-3", label: "₹2–3 lakh", min: 2 * L, max: 3 * L },
  { id: "3-5", label: "₹3–5 lakh", min: 3 * L, max: 5 * L },
  { id: "5-8", label: "₹5–8 lakh", min: 5 * L, max: 8 * L },
  { id: "8-12", label: "₹8–12 lakh", min: 8 * L, max: 12 * L },
  { id: "12-20", label: "₹12–20 lakh", min: 12 * L, max: 20 * L },
  { id: "20-35", label: "₹20–35 lakh", min: 20 * L, max: 35 * L },
  { id: "35-50", label: "₹35–50 lakh", min: 35 * L, max: 50 * L },
  { id: "50p", label: "₹50 lakh and above", min: 50 * L },
];

export const presetFor = (min?: number, max?: number) =>
  budgetPresets.find((p) => p.min === min && p.max === max);

export type BudgetResult = { ok: true; min?: number; max?: number } | { ok: false; error: string };

/** Validate raw min/max text from inputs. Empty = no bound. */
export function validateBudget(minRaw: string, maxRaw: string): BudgetResult {
  const parse = (v: string) => {
    const t = v.replace(/[,\s₹]/g, "");
    if (!t) return undefined;
    return /^\d+$/.test(t) ? Number(t) : NaN;
  };
  const min = parse(minRaw);
  const max = parse(maxRaw);
  if (Number.isNaN(min) || Number.isNaN(max)) return { ok: false, error: "Enter prices as whole rupees, with no minus sign." };
  if (min !== undefined && max !== undefined && min > max) return { ok: false, error: "Minimum price can't be more than maximum price." };
  return { ok: true, ...(min !== undefined && { min }), ...(max !== undefined && { max }) };
}

export const inBudget = (price: number, min?: number, max?: number) =>
  (min === undefined || price >= min) && (max === undefined || price <= max);
