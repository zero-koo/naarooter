'use client';

import { RotateCcw } from 'lucide-react';
import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollSubmitForm from './PollSubmitForm';
import React from 'react';
import PollDetailSection from './PollDetailSection';
import DefaultItemHeader from '../DefaultItemHeader';
import { trpc } from '@/client/trpcClient';
import CommentList from '../comment/CommentList';
import { PostContextProvider } from '@/contexts/PostContext';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const { data: poll, refetch } = usePollQuery(id);

  const { mutateAsync } = trpc.post.reaction.useMutation();

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
        <PostContextProvider key={poll.id} postId={poll.postId}>
          <PollSubmitForm
            id={poll.id}
            onUpdateReaction={(reaction) =>
              mutateAsync({
                type: reaction ?? 'cancel',
                postId: poll.postId,
              })
            }
          />
          <PollDetailSection id={poll.id} />
          <div className="mt-2">
            <CommentList postId={poll.postId} />
          </div>
        </PostContextProvider>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
