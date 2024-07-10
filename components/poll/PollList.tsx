'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { usePollListQuery } from '@/hooks/queries/usePollListQuery';

import PollSubmitForm from './PollSubmitForm';
import { useRouter } from 'next/navigation';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';

const PollList = ({ searchKeyword }: { searchKeyword?: string }) => {
  const { getSearchParams } = useURLSearchParams();

  const search = getSearchParams('search') ?? searchKeyword;
  const [polls] = usePollListQuery({
    search,
  });
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto pb-5">
      {!polls.items.length ? (
        <div className="flex-center bg-base-100 py-20 text-sm opacity-80">{`'${search}' 에 대한 검색 결과가 없습니다.`}</div>
      ) : null}
      {polls.items.map((poll) => (
        <PollSubmitForm
          key={poll.id}
          id={poll.id}
          onClick={() => router.push(`/polls/${poll.id}`)}
        />
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
