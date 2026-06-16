import type { Drama } from "./dramas";

const SITE_URL = "https://dramapulse.vercel.app";
const SITE_NAME = "DramaPulse";
const DEFAULT_DESCRIPTION =
  "Discover the best Chinese short dramas with English subtitles. Watch romance, revenge, thriller, and action mini-series. Stream free on GoodShort.";

export function generatePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage,
}: {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImage ? [ogImage] : [`${SITE_URL}/og-default.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function dramaToMeta(drama: Drama) {
  const description = `${drama.title}: ${drama.synopsis.slice(0, 150)}... Watch online free with English subtitles. Rating: ${drama.rating}/5.`;
  return generatePageMeta({
    title: `${drama.title} - Watch Online Free`,
    description,
    path: `/drama/${drama.slug}`,
    ogImage: drama.coverImage,
  });
}

export function genreToMeta(genre: string, label: string, description: string) {
  return generatePageMeta({
    title: `${label} Short Dramas - Watch Online Free`,
    description: `${description}. Browse our collection of ${label.toLowerCase()} Chinese short dramas with English subtitles.`,
    path: `/genre/${genre}`,
  });
}

export function generateDramaSchema(drama: Drama) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: drama.title,
    description: drama.synopsis,
    image: drama.coverImage,
    genre: drama.tags,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: drama.rating,
      bestRating: "5",
      ratingCount: Math.floor(Math.random() * 50000) + 10000,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
