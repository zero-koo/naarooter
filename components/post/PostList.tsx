'use client';

import { usePostListQuery } from '@/hooks/queries/usePostListQuery';
import { PlusIcon } from 'lucide-react';
import PostListItem from './PostListItem';
import Link from 'next/link';

interface PostListProps {
  groupId?: string;
}

const PostList = ({ groupId }: PostListProps) => {
  const { data } = usePostListQuery({ groupId });

  if (!data) return 'Loading...';

  return (
    <div className="flex flex-col gap-2 bg-base-200 pb-5">
      <div className="px-3 py-1">
        {data.posts.map((post) => (
          <PostListItem
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description as string}
            authorName={post.author.name ?? '익명'}
            createdAt={post.createdAt}
            viewCount={post.viewCount}
            commentCount={post._count.comment}
            listGroupId={groupId}
          />
        ))}
      </div>
      <Link
        className="fixed bottom-5 right-5 rounded-full bg-primary p-2"
        href={`/posts/create?groupId=${groupId}`}
      >
        <PlusIcon />
      </Link>
    </div>
  );
};

export default PostList;
