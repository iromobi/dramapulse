declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

interface GtagEventParams {
  drama_slug?: string;
  drama_title?: string;
  genre_name?: string;
  source?: string;
  [key: string]: string | undefined;
}

export function trackEvent(event: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("event", event, params);
}
