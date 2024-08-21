import { Suspense } from 'react';
import { NextPage } from '@/types/shared';

import LoadingBox from '@/components/ui/LoadingBox';
import DefaultListHeader from '@/components/DefaultListHeader';

import MyVotedPollList from './components/MyVotedPollList';

const MyPolls: NextPage = () => {
  return (
    <>
      <DefaultListHeader title={'내가 참여한 투표'} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <MyVotedPollList />
      </Suspense>
    </>
  );
};

export default MyPolls;
