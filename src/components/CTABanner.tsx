import Link from "next/link";
import { Download, Star } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

export default function CTABanner() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-accent-500/10 border border-surface-800/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/3 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 bg-accent-500/15 text-accent-400 text-sm font-medium px-4 py-2 rounded-full">
              <Star weight="fill" className="w-4 h-4" />
              Rated 4.8 on App Store
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter font-semibold text-surface-100 max-w-[16ch]">
              Ready to dive into the world of short dramas?
            </h2>

            <p className="text-base text-surface-400 max-w-[50ch]">
              Download GoodShort now and get access to thousands of episodes. New dramas added every week with English subtitles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 font-semibold px-8 py-4 rounded-full text-lg transition-all active:scale-[0.98]"
              >
                <Download weight="bold" className="w-5 h-5" />
                Download GoodShort
              </a>
            </div>

            <p className="text-xs text-surface-500">Available on iOS and Android. Free to download.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
