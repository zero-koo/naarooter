'use client';

import { trpc } from '@/client/trpcClient';
import PollSubmitForm from '@/components/poll/PollSubmitForm';
import { useRouter } from 'next/navigation';

const MyVotedPollList = () => {
  const router = useRouter();
  const { data } = trpc.poll.myList.useInfiniteQuery({});

  return (
    <div className="flex flex-col gap-2 pb-5">
      {data?.pages.map(({ items }) =>
        items.map((poll) => (
          <>
            <PollSubmitForm
              key={poll.id}
              id={poll.id}
              initialData={poll}
              onClick={() => router.push(`/polls/${poll.id}`)}
            />
          </>
        ))
      )}
    </div>
  );
};

export default MyVotedPollList;
