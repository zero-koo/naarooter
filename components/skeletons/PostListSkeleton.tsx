import PostListItemSkeleton from './PostListItemSkeleton';

type PostListSkeletonProps = {
  count?: number;
};

const PostListSkeleton = ({ count = 10 }: PostListSkeletonProps) => {
  return (
    <div className="space-y-6 px-2 py-3">
      {Array.from({ length: count }, (_, index) => (
        <PostListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default PostListSkeleton;
