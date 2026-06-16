import Hero from "@/components/Hero";
import DramaGrid from "@/components/DramaGrid";
import GenreSection from "@/components/GenreSection";
import CTABanner from "@/components/CTABanner";
import { getAllDramas, getFeaturedDramas } from "@/lib/dramas";

export default function HomePage() {
  const featured = getFeaturedDramas();
  const all = getAllDramas();

  return (
    <>
      <Hero />
      <DramaGrid dramas={featured} title="Trending Now" subtitle="Featured" />
      <GenreSection />
      <DramaGrid dramas={all} title="All Short Dramas" subtitle="Browse All" />
      <CTABanner />
    </>
  );
}
