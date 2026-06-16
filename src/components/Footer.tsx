import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Romance Dramas", href: "/genre/romance" },
  { label: "Revenge Dramas", href: "/genre/revenge" },
  { label: "Action Dramas", href: "/genre/action" },
  { label: "Thriller Dramas", href: "/genre/thriller" },
  { label: "Download GoodShort", href: "/download" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-800/50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-surface-300">
            DramaPulse
          </Link>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-surface-600">
            &copy; {new Date().getFullYear()} DramaPulse. For entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
