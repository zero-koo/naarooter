import { Suspense } from 'react';
import RootHeader from '@/components/RootHeader';
import PollList from './components/PollList';
import PostList from './components/PostList';
import PostSearchResultList from './components/PostSearchResultList';
import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';

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
            <CommunityHeader title="인기 설문조사" />
            <PollList />
            <CommunityHeader title="인기 포스트" />
            <PostList />
          </div>
        </Suspense>
      )}
    </>
  );
}
