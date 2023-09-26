'use client';

import { trpc } from '@/client/trpcClient';

import PollSubmitForm from './PollSubmitForm';

const PollList = () => {
  const { data } = trpc.poll.list.useQuery({});

  if (!data) return <div>loading..</div>;
  return (
    <div>
      {data.items.map((poll) => (
        <PollSubmitForm
          {...poll}
          key={poll.id}
          choices={poll.choices.map((choice) => ({
            id: choice.id,
            main: choice.main,
            sub: choice.sub,
            voteCount: choice._count.votes,
            index: choice.index,
            voted: !!choice.votes.length,
          }))}
          voteId={
            poll.choices.find((choice) => !!choice.votes.length)?.votes[0]
              ?.id || null
          }
        />
      ))}
    </div>
  );
};

export default PollList;
