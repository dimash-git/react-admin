import LoadingSkeleton from "@/components/loading-skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex w-full h-full justify-center items-center">
      <LoadingSkeleton />
    </div>
  );
}
