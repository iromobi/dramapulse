"use client";

import { useState, useEffect } from "react";
import { List, X, Download } from "@phosphor-icons/react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Romance", href: "/genre/romance" },
  { label: "Revenge", href: "/genre/revenge" },
  { label: "Action", href: "/genre/action" },
  { label: "Thriller", href: "/genre/thriller" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-surface-100 hover:text-accent-400 transition-colors"
        >
          DramaPulse
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-surface-300 hover:text-surface-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <Download weight="bold" className="w-4 h-4" />
            Watch Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-surface-300 hover:text-surface-100 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-surface-950 z-40">
          <div className="flex flex-col gap-4 px-4 pt-8">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg text-surface-300 hover:text-surface-100 transition-colors py-3 border-b border-surface-800/50"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://grlink.onelink.me/oYuU?af_xp=custom&pid=web&c=gr_GRKOCAWTT989777_31001345600_ugv2lt-989777-KOC_0_and&deep_link_value=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777&af_dp=goodreels%3A%2F%2FgrAdjust%3Fbid%3D31001345600%26cid%3D0%26channelCode%3DGRKOCAWTT989777%26token%3Dugv2lt-989777-KOC%26extType%3DKOC%26extCode%3D989777"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-surface-950 text-base font-medium px-6 py-3 rounded-full transition-colors mt-4"
            >
              <Download weight="bold" className="w-5 h-5" />
              Watch Free on GoodShort
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
