import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';

interface CommunityPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | undefined };
}

export default async function CommunityPage({
  params,
  searchParams,
}: CommunityPageProps) {
  void api.post.list.prefetchInfinite({
    communityId: params.id,
    search: searchParams?.search,
  });
  void api.community.byId.prefetch({ id: params.id });

  return (
    <HydrateClient>
      <RootHeader />
      <CommunityHeader communityId={params.id} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PostList communityId={params.id} />
      </Suspense>
    </HydrateClient>
  );
}
