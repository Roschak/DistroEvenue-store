"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { useUiStore } from "@/store/ui-store";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu() {
  const open = useUiStore((s) => s.menuOpen);
  const close = useUiStore((s) => s.closeMenu);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-xl tracking-[0.08em] text-bone">
              DISTRO<span className="text-lime"> </span>AVENUE
            </span>
            <button
              onClick={close}
              className="flex h-10 w-10 items-center justify-center text-bone hover:text-lime"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center gap-1 px-6"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
              >
                <Link
                  href={link.href}
                  onClick={close}
                  className={
                    "group flex items-center justify-between border-b border-ink-line py-4 font-display text-4xl tracking-tight transition-colors " +
                    (pathname === link.href ? "text-lime" : "text-bone hover:text-lime")
                  }
                >
                  {link.label}
                  <ArrowUpRight className="h-6 w-6 text-concrete transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <div className="mb-4 flex items-center gap-3">
              <Link
                href="/account"
                className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-concrete hover:text-lime"
              >
                ACCOUNT
              </Link>
              <span className="text-concrete/40">/</span>
              <Link
                href="/case-study"
                className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-concrete hover:text-lime"
              >
                CASE STUDY
              </Link>
            </div>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
              {SITE.demoLabel} · Unofficial concept. Not affiliated with Distro Avenue
              Store.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
