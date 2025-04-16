'use client';

import Link from 'next/link';
import { PostContextProvider } from '@/contexts/PostContext';
import { PlusIcon } from 'lucide-react';

import { usePollListSuspenseInfiniteQuery } from '@/hooks/queries/usePollListSuspenseInfiniteQuery';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';

import { InfiniteScrollTrigger } from '../utils/InfiniteScrollTrigger';
import PollListItem from './PollListItem';

const PollList = ({ searchKeyword }: { searchKeyword?: string }) => {
  const { getSearchParams } = useURLSearchParams();

  const search = getSearchParams('search') ?? searchKeyword;
  const [pollsInfiniteQueryData, pollsInfiniteQueryResult] =
    usePollListSuspenseInfiniteQuery({
      search,
    });

  return (
    <div className="flex flex-1 flex-col overflow-auto pb-5">
      {!pollsInfiniteQueryData.pages[0]?.polls.length ? (
        <div className="flex-center bg-base-100 py-20 text-sm opacity-80">{`'${search}' 에 대한 검색 결과가 없습니다.`}</div>
      ) : null}
      <div className="flex flex-col gap-2">
        {pollsInfiniteQueryData.pages.map(({ polls }) =>
          polls.map((poll) => (
            <PostContextProvider key={poll.post.id} postId={poll.post.id}>
              <PollListItem initialData={poll} />
            </PostContextProvider>
          ))
        )}
      </div>
      <InfiniteScrollTrigger {...pollsInfiniteQueryResult} />
    </div>
  );
};

export default PollList;
