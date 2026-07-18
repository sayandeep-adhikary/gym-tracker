import { Skeleton } from "@/components/ui/skeleton";

/** Route-level loading UI shown while a page's server work is in flight. */
export default function Loading() {
  return (
    <div className="space-y-12" aria-busy>
      <Skeleton className="h-56 w-full rounded-2xl" />

      <div className="space-y-5">
        <Skeleton className="h-7 w-40" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  );
}
