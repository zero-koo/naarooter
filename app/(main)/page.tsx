import { Suspense } from 'react';
import RootHeader from '@/components/RootHeader';
import PollList from './components/PollList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import PostList from './components/PostList';
import PostSearchResultList from './components/PostSearchResultList';
import PostListSkeleton from '@/components/skeletons/PostListSkeleton';
import PollListSkeleton from '@/components/skeletons/PollListSkeleton';
import { Skeleton } from '@/components/ui/Skeleton';

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
        <Suspense
          fallback={
            <div className="">
              <Skeleton className="mb-2 h-2 w-10" />
              <PollListSkeleton />
              <Skeleton className="mb-2 mt-10 h-2 w-10" />
              <PostListSkeleton count={10} />
            </div>
          }
        >
          <div className="mt-2 flex-1 overflow-auto">
            <Link href={'/polls'}>
              <Button
                variant={'text'}
                size="lg"
                className="mx-3 mb-2 font-bold"
              >
                설문조사
              </Button>
            </Link>
            <PollList />
            <Link href={'/posts'}>
              <Button
                variant={'text'}
                size="lg"
                className="mx-3 mb-2 font-bold opacity-80"
              >
                커뮤니티
              </Button>
            </Link>
            <PostList />
          </div>
        </Suspense>
      )}
    </>
  );
}
