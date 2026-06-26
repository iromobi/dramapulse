"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

export default function DramaDetailTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    trackEvent("drama_detail_view", {
      drama_slug: slug,
      drama_title: title,
    });
  }, [slug, title]);

  return null;
}
