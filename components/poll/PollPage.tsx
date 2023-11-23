'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollSubmitForm from './PollSubmitForm';
import React from 'react';
import PollDetailSection from './PollDetailSection';
import PostCommentSection from './PostCommentSection';

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
        <React.Fragment key={poll.id}>
          <PollSubmitForm id={poll.id} />
          <PollDetailSection id={poll.id} />
          <PostCommentSection postId={poll.postId} authorId={poll.authorId} />
        </React.Fragment>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
