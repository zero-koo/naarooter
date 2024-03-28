import DefaultListHeader from '@/components/DefaultListHeader';
import { NextPage } from '@/types/shared';
import AccountInfo from './components/AccountInfo';

const MyPage: NextPage = () => {
  return (
    <>
      <DefaultListHeader title={'회원 정보'} />
      <AccountInfo />
    </>
  );
};

export default MyPage;
