'use client';

import { api } from '@/trpc/react';

import PostListItem from '@/components/post/PostListItem';

const MyPostList = () => {
  const { data } = api.post.myList.useInfiniteQuery(
    {},
    // TODO!
    // Fix getNextPageParam
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );
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
              likeCount={post.reaction.likeCount - post.reaction.dislikeCount}
              postType={post.type}
              commentCount={post.commentCount}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPostList;
