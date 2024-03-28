import DefaultListHeader from '@/components/DefaultListHeader';
import { NextPage } from '@/types/shared';
import MyVotedPollList from './components/MyVotedPollList';

const MyPolls: NextPage = () => {
  return (
    <>
      <DefaultListHeader title={'내가 참여한 투표'} />
      <MyVotedPollList />
    </>
  );
};

export default MyPolls;
