"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transitionEnd: { display: "none" } }}
          transition={{ duration: 0.35, delay: 0.4, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center bg-ink"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-display text-4xl text-bone md:text-6xl"
          >
            AVENUE
          </motion.span>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}
