import Skeleton from '../ui/Skeleton';

const PollListItemSkeleton = () => {
  return (
    <div className="space-y-3 py-1">
      <Skeleton className="h-6 w-64 max-w-full" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="ml-auto h-4 w-10" />
        <Skeleton className="ml-1.5 h-4 w-10" />
      </div>
    </div>
  );
};

export default PollListItemSkeleton;
