import { Suspense } from 'react';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import PollPage from '@/components/poll/PollPage';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

interface PollPageProps {
  params: {
    id: string;
  };
}

export default function Poll({ params }: PollPageProps) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <DefaultItemHeader backLink={'/polls'} />
            <PostSkeleton />
          </>
        }
      >
        <PollPage id={params.id} />
      </Suspense>
    </>
  );
}
