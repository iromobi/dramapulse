import type { MetadataRoute } from "next";
import { getAllDramas, getAllGenres } from "@/lib/dramas";

const BASE_URL = "https://dramapulse.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const dramas = getAllDramas();
  const genres = getAllGenres();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/download`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const dramaRoutes: MetadataRoute.Sitemap = dramas.map((drama) => ({
    url: `${BASE_URL}/drama/${drama.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const genreRoutes: MetadataRoute.Sitemap = genres.map((genre) => ({
    url: `${BASE_URL}/genre/${genre}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dramaRoutes, ...genreRoutes];
}
