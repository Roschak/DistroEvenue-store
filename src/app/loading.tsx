import { Skeleton } from "@/components/ui/Misc";

export default function Loading() {
  return (
    <div className="px-5 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-7xl" aria-busy="true" aria-label="Loading">
        <Skeleton className="mb-3 h-3 w-32" />
        <Skeleton className="mb-10 h-20 w-3/4 md:h-28" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5] w-full" />
              <Skeleton className="mt-3 h-3 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
