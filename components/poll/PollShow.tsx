'use client';

import { PostContextProvider } from '@/contexts/PostContext';

import CommentList from '../comment/CommentList';
import PollBaseSection from './PollBaseSection';
import PollDetailSection from './PollDetailSection';

const PollShow = ({ postId }: { postId: string }) => {
  return (
    <PostContextProvider postId={postId}>
      <PollBaseSection />
      <PollDetailSection />
      <div className="mt-2">
        <CommentList />
      </div>
    </PostContextProvider>
  );
};

export default PollShow;
