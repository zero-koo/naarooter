'use client';

import { RotateCcw } from 'lucide-react';
import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollSubmitForm from './PollSubmitForm';
import React from 'react';
import PollDetailSection from './PollDetailSection';
import PostCommentSection from './PostCommentSection';
import DefaultItemHeader from '../DefaultItemHeader';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const { data: poll, refetch } = usePollQuery(id);

  return (
    <div className="h-full">
      <DefaultItemHeader
        backLink={'/'}
        right={
          <button className="ml-auto p-1 opacity-50" onClick={() => refetch()}>
            <RotateCcw size={18} />
          </button>
        }
      />
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
