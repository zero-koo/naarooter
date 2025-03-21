import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';
import { NextPage } from '@/types/shared';

import LoadingBox from '@/components/ui/LoadingBox';
import DefaultListHeader from '@/components/DefaultListHeader';
import MainLayout from '@/components/layouts/MainLayout';

import MyPostList from './components/MyPostList';

const MyPosts: NextPage = () => {
  void api.post.myList.prefetchInfinite({});

  return (
    <HydrateClient>
      <MainLayout
        header={<DefaultListHeader title={'나의 포스트'} />}
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <MyPostList />
          </Suspense>
        }
      />
    </HydrateClient>
  );
};

export default MyPosts;
