import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeaderView from '@/components/community/CommunityHeaderView';
import MainLayout from '@/components/layouts/MainLayout';
import PollList from '@/components/poll/PollList';
import RootHeader from '@/components/RootHeader';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  void api.poll.list.prefetchInfinite({
    search: searchParams?.search,
  });

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={<CommunityHeaderView title={'설문조사'} />}
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <PollList searchKeyword={searchParams?.search} />
          </Suspense>
        }
      />
    </HydrateClient>
  );
}
