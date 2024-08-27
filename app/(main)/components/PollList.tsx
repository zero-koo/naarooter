'use client';

import { PostContextProvider } from '@/contexts/PostContext';

import { usePollListSuspenseInfiniteQuery } from '@/hooks/queries/usePollListSuspenseInfiniteQuery';
import PollListItem from '@/components/poll/PollListItem';

const PollList = () => {
  const [polls] = usePollListSuspenseInfiniteQuery({
    limit: 2,
  });

  return (
    <div className="flex flex-col gap-2 pb-5">
      {polls.pages[0]?.polls.map((poll) => (
        <PostContextProvider key={poll.post.id} postId={poll.post.id}>
          <PollListItem initialData={poll} />
        </PostContextProvider>
      ))}
    </div>
  );
};

export default PollList;
