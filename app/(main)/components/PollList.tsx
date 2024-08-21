'use client';

import { PostContextProvider } from '@/contexts/PostContext';

import { usePollListQuery } from '@/hooks/queries/usePollListQuery';
import PollListItem from '@/components/poll/PollListItem';

const PollList = () => {
  const [polls] = usePollListQuery({
    limit: 2,
  });

  return (
    <div className="flex flex-col gap-2 pb-5">
      {polls.polls.map((poll) => (
        <PostContextProvider key={poll.post.id} postId={poll.post.id}>
          <PollListItem initialData={poll} />
        </PostContextProvider>
      ))}
    </div>
  );
};

export default PollList;
