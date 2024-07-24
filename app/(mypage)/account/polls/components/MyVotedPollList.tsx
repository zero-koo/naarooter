'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '@/client/trpcClient';
import { PostContextProvider } from '@/contexts/PostContext';

import GrayBox from '@/components/ui/GrayBox';
import PollSubmitForm from '@/components/poll/PollSubmitForm';

const MyVotedPollList = () => {
  const router = useRouter();
  const { data } = trpc.poll.myList.useInfiniteQuery({});

  return (
    <div className="flex flex-col gap-2 pb-5">
      {data?.pages.map(({ items }) =>
        items.map((poll) => (
          <PostContextProvider key={poll.id} postId={poll.id}>
            <GrayBox
              className={'py-3 md:px-1 md:py-4'}
              onClick={() => router.push(`/polls/${poll.id}`)}
            >
              <PollSubmitForm />
            </GrayBox>
          </PostContextProvider>
        ))
      )}
    </div>
  );
};

export default MyVotedPollList;
