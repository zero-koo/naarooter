import GrayBox from '../ui/GrayBox';
import Loading from '../ui/Loading';
import Skeleton from '../ui/Skeleton';

const PostSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-3 py-0.5">
      <GrayBox className="space-y-2.5 p-3">
        <Skeleton className="h-6 w-full" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="ml-auto h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </GrayBox>
      <div className="flex-center flex-1 py-10">
        <Loading />
      </div>
    </div>
  );
};

export default PostSkeleton;
