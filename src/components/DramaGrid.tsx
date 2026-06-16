import type { Drama } from "@/lib/dramas";
import DramaCard from "./DramaCard";
import ScrollReveal from "./ScrollReveal";

interface DramaGridProps {
  dramas: Drama[];
  title?: string;
  subtitle?: string;
}

export default function DramaGrid({ dramas, title, subtitle }: DramaGridProps) {
  return (
    <section id="browse" className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28">
      {title && (
        <ScrollReveal>
          <div className="mb-12">
            {subtitle && (
              <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-3">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl tracking-tighter font-semibold text-surface-100">
              {title}
            </h2>
          </div>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {dramas.map((drama, i) => (
          <ScrollReveal key={drama.id} delay={i * 0.05} amount={0.1}>
            <DramaCard drama={drama} priority={i < 4} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
