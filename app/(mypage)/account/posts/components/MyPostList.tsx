'use client';

import { trpc } from '@/client/trpcClient';

import PostListItem from '@/components/post/PostListItem';

const MyPostList = () => {
  const { data } = trpc.post.myList.useInfiniteQuery({});
  return (
    <div className="flex flex-col gap-2 pb-5">
      <div className="px-3 py-1">
        {data?.pages.map(({ posts }) =>
          posts.map((post) => (
            <PostListItem
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description as string}
              authorName={post.author.name ?? '익명'}
              createdAt={post.createdAt}
              viewCount={post.viewCount}
              likeCount={
                post.postReaction.likeCount - post.postReaction.dislikeCount
              }
              postType={post.type}
              commentCount={post._count.comment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPostList;
