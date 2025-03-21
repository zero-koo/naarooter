import { NextPage } from '@/types/shared';

import DefaultListHeader from '@/components/DefaultListHeader';
import MainLayout from '@/components/layouts/MainLayout';

import AccountInfo from './components/AccountInfo';

const MyPage: NextPage = () => {
  return (
    <MainLayout
      header={<DefaultListHeader title={'회원 정보'} />}
      body={<AccountInfo />}
    />
  );
};

export default MyPage;
