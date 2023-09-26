'use client';

import Link from 'next/link';
import { trpc } from '@/client/trpcClient';
import { PlusIcon } from 'lucide-react';

import PollSubmitForm from './PollSubmitForm';

const PollList = () => {
  const { data } = trpc.poll.list.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!data) return <div>loading..</div>;
  return (
    <div className="flex flex-col gap-2 pb-5">
      {data.items.map((poll) => (
        <PollSubmitForm
          {...poll}
          key={poll.id}
          choices={poll.choices.map((choice) => ({
            id: choice.id,
            main: choice.main,
            sub: choice.sub,
            voteCount: choice._count.votes,
            index: choice.index,
            voted: !!choice.votes.length,
          }))}
          voteId={
            poll.choices.find((choice) => !!choice.votes.length)?.votes[0]
              ?.id || null
          }
          showLink
        />
      ))}
      <Link
        className="fixed bottom-5 right-5 rounded-full bg-primary p-2"
        href="/create/poll"
      >
        <PlusIcon />
      </Link>
    </div>
  );
};

export default PollList;
