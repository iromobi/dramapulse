import Link from "next/link";
import { Download, Play } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";
import { getAllDramas } from "@/lib/dramas";

export default function Hero() {
  const dramas = getAllDramas();
  const heroDramas = dramas.slice(0, 4);
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.04),transparent_50%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium">
                Short Dramas, Big Stories
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.05] font-semibold text-surface-100 max-w-[14ch]">
                Every episode hits like a plot twist
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base text-surface-300 leading-relaxed max-w-[45ch]">
                Binge the best short dramas in minutes, not hours. Romance, revenge, thriller, and more, all with English subtitles.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-6 py-3 rounded-full text-base transition-all active:scale-[0.98]"
                  data-track="download_click"
                  data-track-source="hero"
                >
                  <Download weight="bold" className="w-5 h-5" />
                  Download GoodShort Free
                </a>
                <Link
                  href="#browse"
                  className="inline-flex items-center justify-center gap-2 bg-surface-800 hover:bg-surface-700 text-surface-100 font-medium px-6 py-3 rounded-full text-base transition-all active:scale-[0.98]"
                >
                  <Play weight="fill" className="w-5 h-5" />
                  Browse Dramas
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: visual */}
          <ScrollReveal delay={0.2} direction="left">
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 flex flex-col gap-3 pt-8">
                  <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-surface-800">
                    <img
                      src={heroDramas[0].coverImage}
                      alt={heroDramas[0].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-surface-800">
                    <img
                      src={heroDramas[1].coverImage}
                      alt={heroDramas[1].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-surface-800">
                    <img
                      src={heroDramas[2].coverImage}
                      alt={heroDramas[2].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-surface-800">
                    <img
                      src={heroDramas[3].coverImage}
                      alt={heroDramas[3].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
