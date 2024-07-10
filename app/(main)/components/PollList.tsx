'use client';

import { usePollListQuery } from '@/hooks/queries/usePollListQuery';

import { useRouter } from 'next/navigation';
import PollSubmitForm from '@/components/poll/PollSubmitForm';

const PollList = () => {
  const { data } = usePollListQuery({
    limit: 2,
  });
  const router = useRouter();

  if (!data) return <div>loading..</div>;
  return (
    <div className="flex flex-col gap-2 pb-5">
      {data.items.map((poll) => (
        <PollSubmitForm
          key={poll.id}
          id={poll.id}
          initialData={poll}
          onClick={() => router.push(`/polls/${poll.id}`)}
        />
      ))}
    </div>
  );
};

export default PollList;
