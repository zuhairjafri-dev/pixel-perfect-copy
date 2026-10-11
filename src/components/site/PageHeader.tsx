export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="fade-up mt-3 text-4xl md:text-6xl">{title}</h1>
        {intro && <p className="fade-up mt-4 max-w-2xl text-ink-muted">{intro}</p>}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 text-[15px] leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
}
