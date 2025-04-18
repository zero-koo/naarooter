import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeaderView from '@/components/community/CommunityHeaderView';
import MainLayout from '@/components/layouts/MainLayout';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';

const PostListPage = async () => {
  void api.post.list.prefetchInfinite({});

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={<CommunityHeaderView title={'전체 포스트'} />}
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <PostList />
          </Suspense>
        }
      />
    </HydrateClient>
  );
};

export default PostListPage;
