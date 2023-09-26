'use client';

import Link from 'next/link';
import { trpc } from '@/client/trpcClient';
import { ArrowLeft, RotateCcw } from 'lucide-react';

import PollSubmitForm from './PollSubmitForm';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const { data: poll, refetch } = trpc.poll.byId.useQuery({
    id,
  });

  return (
    <div className="h-full">
      <div className="flex items-center bg-base-200 p-3 pb-1">
        <Link href={'/'}>
          <ArrowLeft size={20} />
        </Link>
        <button className="ml-auto opacity-50" onClick={() => refetch()}>
          <RotateCcw size={18} />
        </button>
      </div>
      {poll ? (
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
        />
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
