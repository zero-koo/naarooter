import RootHeader from '@/components/RootHeader';
import PollList from './components/PollList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
        <div className="mt-2 flex-1 overflow-auto">
          <Link href={'/polls'}>
            <Button variant={'text'} size="lg" className="mx-3 mb-2 font-bold">
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
      )}
    </>
  );
}
