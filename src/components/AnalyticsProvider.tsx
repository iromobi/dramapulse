"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, trackEvent } from "@/lib/gtag";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Track visit with IP & UA on server side
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {});

    if (!GA_ID) return;

    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-track]");
      if (!(el instanceof HTMLElement)) return;

      const event = el.dataset.track!;
      const params: Record<string, string> = {};

      if (el.dataset.trackSlug) params.drama_slug = el.dataset.trackSlug;
      if (el.dataset.trackTitle) params.drama_title = el.dataset.trackTitle;
      if (el.dataset.trackGenre) params.genre_name = el.dataset.trackGenre;
      if (el.dataset.trackSource) params.source = el.dataset.trackSource;

      trackEvent(event, params);
    };

    document.addEventListener("click", handler, { passive: true });
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_location: window.location.href,
                  page_title: document.title,
                });
              `,
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
