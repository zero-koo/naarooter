'use client';

import { PostContextProvider } from '@/contexts/PostContext';
import { api } from '@/trpc/react';

import PollListItem from '@/components/poll/PollListItem';

const MyVotedPollList = () => {
  const [polls] = api.poll.myList.useSuspenseInfiniteQuery(
    {},
    // TODO
    // Fix getNextPageParam
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <div className="flex flex-col gap-2 pb-5">
      {polls.pages.map(({ polls }) =>
        polls.map((poll) => (
          <PostContextProvider key={poll.post.id} postId={poll.post.id}>
            <PollListItem initialData={poll} />
          </PostContextProvider>
        ))
      )}
    </div>
  );
};

export default MyVotedPollList;
