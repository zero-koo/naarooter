import { NextPage } from '@/types/shared';

import DefaultListHeader from '@/components/DefaultListHeader';

import MyPostList from './components/MyPostList';

const MyPosts: NextPage = () => {
  return (
    <>
      <DefaultListHeader title={'나의 포스트'} />
      <MyPostList />
    </>
  );
};

export default MyPosts;
