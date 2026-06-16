import Link from "next/link";
import { Star, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import type { Drama } from "@/lib/dramas";

interface DramaCardProps {
  drama: Drama;
  priority?: boolean;
}

export default function DramaCard({ drama, priority = false }: DramaCardProps) {
  return (
    <Link
      href={`/drama/${drama.slug}`}
      className="group block rounded-2xl overflow-hidden bg-surface-900 border border-surface-800/50 hover:border-surface-700 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/5"
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={drama.coverImage}
          alt={drama.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="inline-flex items-center gap-1.5 text-surface-100 text-sm font-medium">
            <PlayCircle weight="fill" className="w-5 h-5 text-accent-400" />
            Watch Now
          </span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-surface-950/70 backdrop-blur-sm text-accent-400 text-xs font-semibold px-2 py-1 rounded-full">
          <Star weight="fill" className="w-3 h-3" />
          {drama.rating}
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-surface-950/70 backdrop-blur-sm text-surface-200 text-xs px-2 py-1 rounded-full">
          {drama.releaseYear}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-surface-100 leading-tight mb-1 group-hover:text-accent-400 transition-colors line-clamp-1">
          {drama.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-400 uppercase tracking-wider">
            {drama.genre}
          </span>
          <span className="text-surface-700">|</span>
          <span className="text-xs text-surface-500">{drama.views} views</span>
        </div>
      </div>
    </Link>
  );
}
