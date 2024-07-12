import PollListItemSkeleton from './PollListItemSkeleton';

type PostListSkeletonProps = {
  count?: number;
};

const PollListSkeleton = ({ count = 10 }: PostListSkeletonProps) => {
  return (
    <div className="space-y-6 py-1">
      {Array.from({ length: count }, (_, index) => (
        <PollListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default PollListSkeleton;
