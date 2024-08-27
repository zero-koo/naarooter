'use client';

import { usePostListSuspenseInfiniteQuery } from '@/hooks/queries/usePostListSuspenseInfiniteQuery';
import PostListItem from '@/components/post/PostListItem';

const PostList = () => {
  const [posts] = usePostListSuspenseInfiniteQuery({ limit: 10 });

  return (
    <div className="pb-3">
      {posts.pages.flatMap(({ posts }) =>
        posts.map((post) => (
          <PostListItem
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description as string}
            authorName={post.author.name ?? '익명'}
            postType={post.type}
            createdAt={post.createdAt}
            viewCount={post.viewCount}
            likeCount={post.reaction.likeCount - post.reaction.dislikeCount}
            commentCount={post.commentCount}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
