'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { usePollListQuery } from '@/hooks/queries/usePollListQuery';

import PollSubmitForm from './PollSubmitForm';
import { useRouter } from 'next/navigation';

const PollList = () => {
  const { data } = usePollListQuery();
  const router = useRouter();

  if (!data) return <div>loading..</div>;
  return (
    <div className="flex flex-col gap-2 pb-5">
      {data.items.map((poll) => (
        <>
          <PollSubmitForm
            key={poll.id}
            id={poll.id}
            onClick={() => router.push(`/polls/${poll.id}`)}
          />
        </>
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
