import Link from "next/link";
import { ArrowRight, Heart, Sword, Fire, Detective } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const GENRE_CARDS = [
  {
    label: "Romance",
    slug: "romance",
    description: "Love and passion in every episode",
    icon: Heart,
    gradient: "from-rose-500/20 to-rose-600/5",
    iconColor: "text-rose-400",
  },
  {
    label: "Revenge",
    slug: "revenge",
    description: "Stories of justice and payback",
    icon: Sword,
    gradient: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
  },
  {
    label: "Action",
    slug: "action",
    description: "High-stakes thrills and fights",
    icon: Fire,
    gradient: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-orange-400",
  },
  {
    label: "Thriller",
    slug: "thriller",
    description: "Edge-of-your-seat suspense",
    icon: Detective,
    gradient: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
];

export default function GenreSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 border-t border-surface-800/50">
      <ScrollReveal>
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-3">
            Genres
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tighter font-semibold text-surface-100">
            Find your next obsession
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GENRE_CARDS.map((genre, i) => {
          const Icon = genre.icon;
          return (
            <ScrollReveal key={genre.slug} delay={i * 0.08}>
              <Link
                href={`/genre/${genre.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${genre.gradient} border border-surface-800/50 hover:border-surface-700 p-6 transition-all duration-300 hover:shadow-lg block`}
                data-track="genre_click"
                data-track-genre={genre.slug}
              >
                <Icon weight="fill" className={`w-10 h-10 ${genre.iconColor} mb-4`} />
                <h3 className="text-xl font-semibold text-surface-100 mb-2">{genre.label}</h3>
                <p className="text-sm text-surface-400 mb-4">{genre.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-accent-400 group-hover:gap-2 transition-all">
                  Browse <ArrowRight weight="bold" className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
