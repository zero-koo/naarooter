'use client';

import Link from 'next/link';
import { PostContextProvider } from '@/contexts/PostContext';
import { PlusIcon } from 'lucide-react';

import { usePollListQuery } from '@/hooks/queries/usePollListQuery';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';

import PollListItem from './PollListItem';

const PollList = ({ searchKeyword }: { searchKeyword?: string }) => {
  const { getSearchParams } = useURLSearchParams();

  const search = getSearchParams('search') ?? searchKeyword;
  const [polls] = usePollListQuery({
    search,
  });

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto pb-5">
      {!polls.items.length ? (
        <div className="flex-center bg-base-100 py-20 text-sm opacity-80">{`'${search}' 에 대한 검색 결과가 없습니다.`}</div>
      ) : null}
      {polls.items.map((poll) => (
        <PostContextProvider key={poll.id} postId={poll.id}>
          <PollListItem />
        </PostContextProvider>
      ))}
      <Link
        className="fixed bottom-5 right-5 rounded-full bg-primary p-2"
        href="/polls/create"
      >
        <PlusIcon />
      </Link>
    </div>
  );
};

export default PollList;
