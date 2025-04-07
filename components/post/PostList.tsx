'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { usePostListSuspenseInfiniteQuery } from '@/hooks/queries/usePostListSuspenseInfiniteQuery';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { InfiniteScrollTrigger } from '@/components/utils/InfiniteScrollTrigger';

import GrayBox from '../ui/GrayBox';
import PostListItem from './PostListItem';

interface PostListProps {
  communityId?: string;
  searchKeyword?: string;
}

const PostList = ({ communityId, searchKeyword }: PostListProps) => {
  const session = useSession();
  const { getSearchParams } = useURLSearchParams();

  const search = getSearchParams('search') ?? searchKeyword;

  const [postsInfiniteQueryData, postListInfiniteQueryResult] =
    usePostListSuspenseInfiniteQuery({
      communityId,
      search,
    });

  return (
    <div className="flex flex-col pb-5">
      {!postsInfiniteQueryData.pages[0]?.posts.length ? (
        <GrayBox className="flex-center py-24 text-sm opacity-80">
          {search
            ? `'${search}' 에 대한 검색 결과가 없습니다.`
            : '등록된 글이 없습니다.'}
        </GrayBox>
      ) : (
        <div>
          {postsInfiniteQueryData.pages.map((page) =>
            page.posts.map((post) => (
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
                communityId={communityId}
              />
            ))
          )}
        </div>
      )}
      <InfiniteScrollTrigger {...postListInfiniteQueryResult} />
      <Link
        className="fixed bottom-5 right-5 rounded-full bg-primary p-2"
        href={
          session.data?.user
            ? `/post/create?communityId=${communityId}`
            : `/signin?redirect=${encodeURIComponent(`/post/create?communityId=${communityId}`)}`
        }
      >
        <PlusIcon />
      </Link>
    </div>
  );
};

export default PostList;
