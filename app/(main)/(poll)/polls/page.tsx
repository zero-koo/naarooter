import DefaultListHeader from '@/components/DefaultListHeader';
import RootHeader from '@/components/RootHeader';
import PollList from '@/components/poll/PollList';
import LoadingBox from '@/components/ui/LoadingBox';
import { Suspense } from 'react';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <>
      <RootHeader />
      <DefaultListHeader title={'설문조사'} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PollList searchKeyword={searchParams?.search} />
      </Suspense>
    </>
  );
}
