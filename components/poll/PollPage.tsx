'use client';

import React from 'react';
import { PostContextProvider } from '@/contexts/PostContext';
import { RotateCcw } from 'lucide-react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import CommentList from '../comment/CommentList';
import DefaultItemHeader from '../DefaultItemHeader';
import PollDetailSection from './PollDetailSection';
import PollShow from './PollShow';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const [, { refetch }] = usePollQuery(id);

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
      <PostContextProvider postId={id}>
        <PollShow />
        <PollDetailSection />
        <div className="mt-2">
          <CommentList />
        </div>
      </PostContextProvider>
    </div>
  );
}
