'use client';

import { usePostListQuery } from '@/hooks/queries/usePostListQuery';
import PostListItem from '@/components/post/PostListItem';

const PostList = () => {
  const [posts] = usePostListQuery({ limit: 10 });

  return (
    <div className="flex flex-col gap-2 bg-base-200 pb-5 ">
      <div className="px-3">
        {posts.posts.map((post) => (
          <PostListItem
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description as string}
            authorName={post.author.name ?? '익명'}
            postType={post.type}
            createdAt={post.createdAt}
            viewCount={post.viewCount}
            likeCount={
              post.postReaction.likeCount - post.postReaction.dislikeCount
            }
            commentCount={post._count.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
