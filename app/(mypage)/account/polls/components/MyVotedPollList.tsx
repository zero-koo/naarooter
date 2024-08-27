'use client';

import { PostContextProvider } from '@/contexts/PostContext';
import { api } from '@/trpc/react';

import PollListItem from '@/components/poll/PollListItem';
import { InfiniteScrollTrigger } from '@/components/utils/InfiniteScrollTrigger';

const MyVotedPollList = () => {
  const [myVotedPollsInfiniteQueryData, myVotedPollsInfiniteQueryResult] =
    api.poll.myList.useSuspenseInfiniteQuery(
      {},
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <div className="pb-5">
      <div className="flex flex-col gap-2">
        {myVotedPollsInfiniteQueryData.pages.map(({ polls }) =>
          polls.map((poll) => (
            <PostContextProvider key={poll.post.id} postId={poll.post.id}>
              <PollListItem initialData={poll} />
            </PostContextProvider>
          ))
        )}
      </div>
      <InfiniteScrollTrigger {...myVotedPollsInfiniteQueryResult} />
    </div>
  );
};

export default MyVotedPollList;
