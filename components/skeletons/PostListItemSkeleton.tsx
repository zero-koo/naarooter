import Skeleton from '../ui/Skeleton';

const PostListItemSkeleton = () => {
  return (
    <div className="space-y-2 py-1">
      <Skeleton className="h-6 w-full" />
      <div className="flex gap-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="ml-auto h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
};

export default PostListItemSkeleton;
