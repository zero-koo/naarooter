'use client';

import { usePostListQuery } from '@/hooks/queries/usePostListQuery';
import PostListItem from '@/components/post/PostListItem';

const PostList = () => {
  const [posts] = usePostListQuery({ limit: 10 });

  return (
    <div className="pb-3">
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
  );
};

export default PostList;
