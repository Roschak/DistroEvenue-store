"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { useBagStore } from "@/store/bag-store";
import { useUiStore } from "@/store/ui-store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const mounted = useHydrated();
  const pathname = usePathname();
  const count = useBagStore((s) => s.count());
  const openSearch = useUiStore((s) => s.openSearch);
  const openMenu = useUiStore((s) => s.openMenu);
  const openBag = useUiStore((s) => s.openBag);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ink-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl tracking-[0.08em] text-bone transition-colors hover:text-lime md:text-2xl"
          aria-label="DISTRO AVENUE — home"
        >
          DISTRO<span className="text-lime"> </span>AVENUE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-lime",
                pathname === link.href ? "text-lime" : "text-bone/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={openSearch}
            className="flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-lime"
            aria-label="Search the avenue"
          >
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <Link
            href="/account"
            className="hidden h-10 w-10 items-center justify-center text-bone transition-colors hover:text-lime sm:flex"
            aria-label="Account"
          >
            <User className="h-5 w-5" strokeWidth={1.8} />
          </Link>
          <button
            onClick={openBag}
            className="relative flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-lime"
            aria-label={`Open bag, ${mounted ? count : 0} items`}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            {mounted && count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 font-mono text-[9px] font-bold text-ink"
              >
                {count}
              </motion.span>
            )}
          </button>
          <button
            onClick={openMenu}
            className="flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-lime lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Demo-mode strip */}
      <div className="border-t border-ink-line/60 bg-ink/60 text-center font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-concrete backdrop-blur">
        <span className="inline-block py-1">
          <span className="text-lime">●</span> PORTFOLIO DEMO — NOT AN OFFICIAL SITE ·{" "}
          {isHome ? "STREETWEAR FROM THE HEART OF BOGOR" : "DIGITAL AVENUE"}
        </span>
      </div>
    </motion.header>
  );
}
