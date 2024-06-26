'use client';

import { usePostListQuery } from '@/hooks/queries/usePostListQuery';
import { PlusIcon } from 'lucide-react';
import PostListItem from './PostListItem';
import Link from 'next/link';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { Label } from '../ui/Label';

interface PostListProps {
  groupId?: string;
  searchKeyword?: string;
}

const PostList = ({ groupId, searchKeyword }: PostListProps) => {
  const { getSearchParams } = useURLSearchParams();

  const search = getSearchParams('search') ?? searchKeyword;

  const { data } = usePostListQuery({ groupId, search });

  if (!data) return 'Loading...';

  return (
    <div className="flex flex-col gap-2 pb-5">
      {!data.posts.length ? (
        <div className="flex-center py-20 text-sm opacity-80">
          {search
            ? `'${search}' 에 대한 검색 결과가 없습니다.`
            : '등록된 글이 없습니다.'}
        </div>
      ) : (
        <div className="px-3 py-1">
          {data.posts.map((post) => (
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
              listGroupId={groupId}
            />
          ))}
        </div>
      )}
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
