import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';
import { NextPage } from '@/types/shared';

import LoadingBox from '@/components/ui/LoadingBox';
import DefaultListHeader from '@/components/DefaultListHeader';

import MyVotedPollList from './components/MyVotedPollList';

const MyPolls: NextPage = () => {
  void api.poll.myList.prefetchInfinite({});

  return (
    <HydrateClient>
      <DefaultListHeader title={'내가 참여한 투표'} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <MyVotedPollList />
      </Suspense>
    </HydrateClient>
  );
};

export default MyPolls;
