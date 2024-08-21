import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';
import PollList from '@/components/poll/PollList';
import RootHeader from '@/components/RootHeader';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  void api.poll.list.prefetch({
    search: searchParams?.search,
  });

  return (
    <HydrateClient>
      <RootHeader />
      <CommunityHeader title={'설문조사'} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PollList searchKeyword={searchParams?.search} />
      </Suspense>
    </HydrateClient>
  );
}
