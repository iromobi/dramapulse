import dramasData from "@/data/dramas.json";

export interface Drama {
  id: string;
  title: string;
  slug: string;
  genre: string;
  synopsis: string;
  coverImage: string;
  tags: string[];
  rating: number;
  views: string;
  releaseYear: number;
  promoteWord: string;
  onelink: string;
}

export const GENRES: Record<string, { label: string; description: string }> = {
  romance: {
    label: "Romance",
    description: "Love stories that will make your heart race",
  },
  revenge: {
    label: "Revenge",
    description: "Stories of justice, payback, and rising from the ashes",
  },
  action: {
    label: "Action",
    description: "High-adrenaline dramas with explosive sequences",
  },
  thriller: {
    label: "Thriller",
    description: "Edge-of-your-seat suspense and mystery",
  },
};

export function getAllDramas(): Drama[] {
  return dramasData as Drama[];
}

export function getDramaBySlug(slug: string): Drama | undefined {
  return (dramasData as Drama[]).find((d) => d.slug === slug);
}

export function getDramasByGenre(genre: string): Drama[] {
  return (dramasData as Drama[]).filter((d) => d.genre === genre);
}

export function getFeaturedDramas(): Drama[] {
  return (dramasData as Drama[]).sort((a, b) => b.rating - a.rating).slice(0, 6);
}

export function getRelatedDramas(genre: string, excludeSlug: string, count = 4): Drama[] {
  return (dramasData as Drama[])
    .filter((d) => d.genre === genre && d.slug !== excludeSlug)
    .slice(0, count);
}

export function getAllGenres(): string[] {
  return Object.keys(GENRES);
}
