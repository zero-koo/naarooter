import { NextPage } from '@/types/shared';

import DefaultListHeader from '@/components/DefaultListHeader';

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
