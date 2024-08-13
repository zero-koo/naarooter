import { Suspense } from 'react';
import { api } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';

const PostListPage = async () => {
  void api.post.list.prefetch({});

  return (
    <>
      <RootHeader />
      <CommunityHeader title={'전체 포스트'} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PostList />
      </Suspense>
    </>
  );
};

export default PostListPage;
