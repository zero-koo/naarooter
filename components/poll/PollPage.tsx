'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollSubmitForm from './PollSubmitForm';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const { data: poll, refetch } = usePollQuery(id);

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
        <PollSubmitForm key={poll.id} id={poll.id} />
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
