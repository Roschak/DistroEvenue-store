import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-lime">ERROR 404</p>
      <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-9xl">
        NOTHING
        <br />
        HERE YET.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-concrete">
        This street doesn&apos;t exist — or hasn&apos;t been built yet. Let&apos;s get you back
        to the main avenue.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/">BACK HOME</ButtonLink>
        <ButtonLink href="/shop" variant="outline">BROWSE THE SHOP</ButtonLink>
      </div>
      <Link
        href="/case-study"
        className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-concrete hover:text-lime"
      >
        OR READ THE CASE STUDY
      </Link>
    </div>
  );
}
