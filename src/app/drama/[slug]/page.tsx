import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Star,
  FilmReel,
  Tag,
  ArrowLeft,
  Download,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { getDramaBySlug, getAllDramas, getRelatedDramas } from "@/lib/dramas";
import { dramaToMeta, generateDramaSchema, generateBreadcrumbSchema } from "@/lib/seo";
import DramaCard from "@/components/DramaCard";
import ScrollReveal from "@/components/ScrollReveal";
import DramaDetailTracker from "@/components/DramaDetailTracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDramas().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);
  if (!drama) return {};
  return dramaToMeta(drama);
}

export default async function DramaPage({ params }: Props) {
  const { slug } = await params;
  const drama = getDramaBySlug(slug);

  if (!drama) {
    notFound();
  }

  const related = getRelatedDramas(drama.genre, drama.slug);

  const schema = generateDramaSchema(drama);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: drama.genre.charAt(0).toUpperCase() + drama.genre.slice(1), url: `/genre/${drama.genre}` },
    { name: drama.title, url: `/drama/${drama.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <DramaDetailTracker slug={drama.slug} title={drama.title} />

      <article className="pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-surface-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-surface-300 transition-colors">
              Home
            </Link>
            <CaretRight weight="bold" className="w-3 h-3" />
            <Link href={`/genre/${drama.genre}`} className="hover:text-surface-300 transition-colors capitalize">
              {drama.genre}
            </Link>
            <CaretRight weight="bold" className="w-3 h-3" />
            <span className="text-surface-300 line-clamp-1">{drama.title}</span>
          </nav>

          {/* Back link */}
          <Link
            href="/#browse"
            className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 transition-colors mb-8"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            Back to all dramas
          </Link>

          {/* Main content */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
            {/* Sidebar - Cover image */}
            <ScrollReveal>
              <div className="flex flex-col gap-6">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-surface-800 border border-surface-800/50">
                  <img
                    src={drama.coverImage}
                    alt={drama.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Download CTA sidebar */}
                <a
                  href={drama.onelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-6 py-3 rounded-full text-base transition-all active:scale-[0.98] w-full"
                  data-track="download_click"
                  data-track-source="drama_sidebar"
                  data-track-slug={drama.slug}
                  data-track-title={drama.title}
                >
                  <Download weight="bold" className="w-5 h-5" />
                  Watch on GoodShort
                </a>
              </div>
            </ScrollReveal>

            {/* Main details */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-8">
                {/* Title & meta */}
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-semibold text-surface-100 mb-4">
                    {drama.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 bg-accent-500/15 text-accent-400 font-semibold px-3 py-1 rounded-full">
                      <Star weight="fill" className="w-4 h-4" />
                      {drama.rating}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-surface-800 text-surface-300 px-3 py-1 rounded-full capitalize">
                      <FilmReel weight="fill" className="w-4 h-4" />
                      {drama.genre}
                    </span>
                    <span className="text-surface-500">{drama.views} views</span>
                    <span className="text-surface-500 capitalize">{drama.genre}</span>
                    <span className="text-surface-500">{drama.releaseYear}</span>
                  </div>
                </div>

                {/* Synopsis */}
                <div>
                  <h2 className="text-lg font-semibold text-surface-100 mb-3">Synopsis</h2>
                  <p className="text-surface-400 leading-relaxed max-w-[65ch]">
                    {drama.synopsis}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h2 className="text-lg font-semibold text-surface-100 mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {drama.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 bg-surface-800 text-surface-400 text-sm px-3 py-1.5 rounded-full"
                      >
                        <Tag weight="fill" className="w-3.5 h-3.5 text-accent-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download CTA inline */}
                <div className="bg-surface-900 border border-surface-800/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-surface-100 mb-1">
                      Watch {drama.title} on GoodShort
                    </h3>
                    <p className="text-sm text-surface-400">
                      Full episodes with English subtitles. Tap to install GoodShort and start watching.
                    </p>
                  </div>
                  <a
                    href={drama.onelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-5 py-2.5 rounded-full text-sm transition-all active:scale-[0.98] whitespace-nowrap"
                    data-track="download_click"
                    data-track-source="drama_inline"
                    data-track-slug={drama.slug}
                    data-track-title={drama.title}
                  >
                    <Download weight="bold" className="w-4 h-4" />
                    Watch Now
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Related dramas */}
          {related.length > 0 && (
            <section className="mt-20">
              <ScrollReveal>
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-3">
                    More Like This
                  </p>
                  <h2 className="text-2xl md:text-3xl tracking-tighter font-semibold text-surface-100">
                    Related Dramas
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {related.map((d, i) => (
                  <ScrollReveal key={d.id} delay={i * 0.06} amount={0.1}>
                    <DramaCard drama={d} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
