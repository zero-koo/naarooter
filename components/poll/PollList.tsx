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
          submittedAnswerIndex={(() => {
            const selectedIndex = poll.choices.findIndex(
              (choice) => !!choice.votes.length
            );
            return selectedIndex ?? null;
          })()}
          choices={poll.choices.map((choice) => ({
            main: choice.main,
            sub: choice.sub,
            voteCount: choice._count.votes,
            index: choice.index,
          }))}
        />
      ))}
    </div>
  );
};

export default PollList;
