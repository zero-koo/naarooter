import DefaultListHeader from '@/components/DefaultListHeader';
import RootHeader from '@/components/RootHeader';
import PostList from '@/components/post/PostList';
import LoadingBox from '@/components/ui/LoadingBox';
import { Suspense } from 'react';

const PostListPage = () => {
  return (
    <>
      <RootHeader />
      <DefaultListHeader title="전체방" />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PostList />
      </Suspense>
    </>
  );
};

export default PostListPage;
