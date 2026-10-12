import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface SelectGroup { heading?: string; options: { value: string; label: string; hint?: string }[] }

/** Accessible, keyboard-searchable dropdown. Value "" means "any". */
export function SearchSelect({ label, value, onChange, groups, anyLabel, placeholder, disabled, className }: {
  label: string; value: string; onChange: (v: string) => void; groups: SelectGroup[];
  anyLabel: string; placeholder?: string; disabled?: boolean; className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = groups.flatMap((g) => g.options).find((o) => o.value === value);
  const pick = (v: string) => { onChange(v); setOpen(false); };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" role="combobox" aria-expanded={open} aria-label={label} disabled={disabled}
          className={cn("flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}>
          <span className={cn("truncate", !selected && "opacity-70")}>{selected?.label ?? anyLabel}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder ?? `Search ${label.toLowerCase()}…`} />
          <CommandList className="max-h-72">
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value={`__any ${anyLabel}`} onSelect={() => pick("")}>
                <Check className={cn("mr-2 h-4 w-4", value === "" ? "opacity-100" : "opacity-0")} />{anyLabel}
              </CommandItem>
            </CommandGroup>
            {groups.map((g, i) => (
              <CommandGroup key={g.heading ?? i} heading={g.heading}>
                {g.options.map((o) => (
                  <CommandItem key={o.value} value={`${o.label} ${o.value}`} onSelect={() => pick(o.value)}>
                    <Check className={cn("mr-2 h-4 w-4", value === o.value ? "opacity-100" : "opacity-0")} />
                    <span className="flex-1">{o.label}</span>
                    {o.hint && <span className="text-xs text-muted-foreground">{o.hint}</span>}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
