import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CaretRight, Download } from "@phosphor-icons/react/dist/ssr";
import { getDramasByGenre, getAllGenres, GENRES } from "@/lib/dramas";
import { genreToMeta, generateBreadcrumbSchema } from "@/lib/seo";
import DramaCard from "@/components/DramaCard";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGenres().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const genreInfo = GENRES[slug];
  if (!genreInfo) return {};
  return genreToMeta(slug, genreInfo.label, genreInfo.description);
}

export default async function GenrePage({ params }: Props) {
  const { slug } = await params;
  const genreInfo = GENRES[slug];

  if (!genreInfo) {
    notFound();
  }

  const dramas = getDramasByGenre(slug);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: genreInfo.label, url: `/genre/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-surface-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-surface-300 transition-colors">
              Home
            </Link>
            <CaretRight weight="bold" className="w-3 h-3" />
            <span className="text-surface-300">{genreInfo.label}</span>
          </nav>

          {/* Header */}
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-3">
                {dramas.length} dramas
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-semibold text-surface-100 mb-3">
                {genreInfo.label} Short Dramas
              </h1>
              <p className="text-base text-surface-400 max-w-[55ch]">
                {genreInfo.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Download banner */}
          <ScrollReveal delay={0.1}>
            <div className="bg-surface-900 border border-surface-800/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <div className="flex-1">
                <h2 className="text-base font-semibold text-surface-100 mb-1">
                  Watch {genreInfo.label} dramas on GoodShort
                </h2>
                <p className="text-sm text-surface-400">
                  Full episodes with English subtitles. Free to download.
                </p>
              </div>
              <a
                href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-5 py-2.5 rounded-full text-sm transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <Download weight="bold" className="w-4 h-4" />
                Download Free
              </a>
            </div>
          </ScrollReveal>

          {/* Drama grid */}
          {dramas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {dramas.map((drama, i) => (
                <ScrollReveal key={drama.id} delay={i * 0.04} amount={0.1}>
                  <DramaCard drama={drama} priority={i < 6} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-surface-500 text-lg">No dramas found in this genre yet.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 mt-4 transition-colors"
              >
                Browse all dramas
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
