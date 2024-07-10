import { Skeleton } from '../ui/Skeleton';

type PostListSkeletonProps = {
  count?: number;
};

const PostListSkeleton = ({ count = 2 }: PostListSkeletonProps) => {
  return (
    <div className="space-y-3 py-3">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
};

export default PostListSkeleton;
