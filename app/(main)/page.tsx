import { Suspense } from 'react';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';
import RootHeader from '@/components/RootHeader';

import PollList from './components/PollList';
import PostList from './components/PostList';
import PostSearchResultList from './components/PostSearchResultList';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <>
      <RootHeader />
      {searchParams?.search ? (
        <PostSearchResultList searchKeyword={searchParams.search} />
      ) : (
        <Suspense fallback={<LoadingBox className="h-full" />}>
          <div className="mt-2 flex-1 overflow-auto">
            <CommunityHeader title="인기 설문조사" href="/polls" />
            <PollList />
            <CommunityHeader title="인기 포스트" href="/posts" />
            <PostList />
          </div>
        </Suspense>
      )}
    </>
  );
}
