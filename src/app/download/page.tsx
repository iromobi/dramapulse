import type { Metadata } from "next";
import {
  AppleLogo,
  AndroidLogo,
  Star,
  FilmReel,
  Subtitles,
  DeviceMobile,
  Clock,
  ShieldCheck,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "@/components/ScrollReveal";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Download GoodShort - Watch Short Dramas Free",
  description:
    "Download GoodShort on iOS and Android. Watch thousands of Chinese short dramas with English subtitles. New episodes added weekly. Free to download.",
  path: "/download",
});

const FEATURES = [
  {
    icon: FilmReel,
    title: "Thousands of Episodes",
    description: "Romance, revenge, thriller, action, and more genres updated weekly.",
  },
  {
    icon: Subtitles,
    title: "English Subtitles",
    description: "Every drama comes with high-quality English subtitles for global audiences.",
  },
  {
    icon: DeviceMobile,
    title: "Optimized for Mobile",
    description: "Vertical and horizontal viewing modes designed for your phone.",
  },
  {
    icon: Clock,
    title: "Episodes in Minutes",
    description: "Each episode is 1-3 minutes long. Perfect for quick binge sessions.",
  },
  {
    icon: ShieldCheck,
    title: "Ad-Free Experience",
    description: "Subscribe for uninterrupted viewing. No forced ads during episodes.",
  },
  {
    icon: Star,
    title: "New Releases Weekly",
    description: "Fresh content added every week. Never run out of stories to watch.",
  },
];

export default function DownloadPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Download GoodShort", url: "/download" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06),transparent_70%)]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full py-20">
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 bg-accent-500/15 text-accent-400 text-sm font-medium px-4 py-2 rounded-full">
                <Star weight="fill" className="w-4 h-4" />
                4.8 Rating - 10M+ Downloads
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter font-semibold text-surface-100">
                Download GoodShort
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base md:text-lg text-surface-400 max-w-[48ch] leading-relaxed">
                Your gateway to the best short dramas. Thousands of episodes, English subtitles, new releases every week.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-surface-100 hover:bg-white text-surface-950 font-semibold px-8 py-4 rounded-full text-base transition-all active:scale-[0.98]"
                >
                  <AppleLogo weight="fill" className="w-6 h-6" />
                  Download for iOS
                </a>
                <a
                  href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-surface-800 hover:bg-surface-700 text-surface-100 font-semibold px-8 py-4 rounded-full text-base border border-surface-700 transition-all active:scale-[0.98]"
                >
                  <AndroidLogo weight="fill" className="w-6 h-6" />
                  Download for Android
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xs text-surface-500">Free to download. Subscribe for unlimited access.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 border-t border-surface-800/50">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-3">
              Why GoodShort
            </p>
            <h2 className="text-3xl md:text-4xl tracking-tighter font-semibold text-surface-100">
              Built for short drama lovers
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.06}>
                <div className="bg-surface-900 border border-surface-800/50 rounded-2xl p-6 hover:border-surface-700 transition-colors h-full">
                  <Icon weight="fill" className="w-8 h-8 text-accent-400 mb-4" />
                  <h3 className="text-lg font-semibold text-surface-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 border-t border-surface-800/50">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-accent-500/10 border border-surface-800/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />

            <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 flex flex-col items-center text-center gap-6">
              <DownloadSimple weight="fill" className="w-10 h-10 text-accent-400" />

              <h2 className="text-2xl md:text-4xl tracking-tighter font-semibold text-surface-100 max-w-[15ch]">
                Start watching in 30 seconds
              </h2>

              <p className="text-base text-surface-400 max-w-[45ch]">
                Download GoodShort now. New users get free access to premium episodes for 3 days.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-8 py-4 rounded-full text-base transition-all active:scale-[0.98]"
                >
                  <AppleLogo weight="fill" className="w-5 h-5" />
                  App Store
                </a>
                <a
                  href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-surface-800 hover:bg-surface-700 text-surface-100 font-semibold px-8 py-4 rounded-full text-base border border-surface-700 transition-all active:scale-[0.98]"
                >
                  <AndroidLogo weight="fill" className="w-5 h-5" />
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
