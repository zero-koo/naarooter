import { NextPage } from '@/types/shared';

import DefaultListHeader from '@/components/DefaultListHeader';
import MainLayout from '@/components/layouts/MainLayout';
import RootHeader from '@/components/RootHeader';

import AccountInfo from './components/AccountInfo';

const MyPage: NextPage = () => {
  return (
    <>
      <RootHeader />
      <MainLayout
        header={<DefaultListHeader title={'회원 정보'} />}
        body={<AccountInfo />}
      />
    </>
  );
};

export default MyPage;
