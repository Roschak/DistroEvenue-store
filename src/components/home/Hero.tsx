"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { StoreStatusBadge } from "@/components/ui/Misc";
import { STORE } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Subtle cursor interaction
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-label="DISTRO AVENUE — Where Bogor finds its style"
    >
      {/* Background image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src={IMAGES.heroMain}
          alt="Streetwear editorial photography — a model in urban Bogor atmosphere"
          className="h-full w-full object-cover"
          style={{ x: imgX, y: imgY }}
          initial={{ scale: 1.15 }}
          animate={{ scale: reduce ? 1 : 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-24 pt-32 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
          className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-bone/80"
        >
          <span className="h-px w-10 bg-lime" />
          STREETWEAR FROM THE HEART OF BOGOR
        </motion.p>

        <h1 className="font-display leading-[0.85] tracking-tight text-bone">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="block text-[19vw] md:text-[11rem] lg:text-[13rem]"
          >
            DISTRO
          </motion.span>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.98, duration: 0.8, ease: EASE }}
            className="block text-[19vw] text-lime md:text-[11rem] lg:text-[13rem]"
          >
            AVENUE
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
          className="mt-5 font-mono text-sm font-bold uppercase tracking-[0.3em] text-bone md:text-base"
        >
          WHERE BOGOR FINDS ITS STYLE.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/shop" size="lg">
            SHOP NOW
          </ButtonLink>
          <ButtonLink href="/store" variant="outline" size="lg">
            VISIT STORE
          </ButtonLink>
        </motion.div>
      </div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity: overlayOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between px-10 pb-10 md:flex"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">
          Jl. Pakuan · Bogor · {STORE.plusCode}
        </p>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">
          <ArrowDown className="h-4 w-4 animate-bounce text-lime" />
          SCROLL TO WALK THE AVENUE
        </div>
        <StoreStatusBadge />
      </motion.div>
    </section>
  );
}
