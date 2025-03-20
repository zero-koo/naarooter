import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommnunityDescription from '@/components/community/CommunityDescription';
import CommunityHeader from '@/components/community/CommunityHeader';
import MainLayout from '@/components/layouts/MainLayout';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';

interface CommunityPageProps {
  params: {
    cid: string;
  };
  searchParams?: { [key: string]: string | undefined };
}

export default async function CommunityPage({
  params,
  searchParams,
}: CommunityPageProps) {
  void api.post.list.prefetchInfinite({
    communityId: params.cid,
    search: searchParams?.search,
  });
  void api.community.byId.prefetch({ id: params.cid });

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={<CommunityHeader communityId={params.cid} />}
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <PostList communityId={params.cid} />
          </Suspense>
        }
        aside={
          <Suspense>
            <CommnunityDescription communityId={params.cid} />
          </Suspense>
        }
      />
    </HydrateClient>
  );
}
