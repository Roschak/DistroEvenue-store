"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-avenue-red">
        NETWORK / SYSTEM ERROR
      </p>
      <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-8xl">
        THE AVENUE IS
        <br />
        TEMPORARILY OFFLINE.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-concrete">
        Something went wrong on our side. Try again — or walk back to the main avenue.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={reset}>TRY AGAIN</Button>
      </div>
    </div>
  );
}
