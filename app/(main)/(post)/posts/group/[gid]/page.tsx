import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { api, HydrateClient } from '@/trpc/server';

import { COMMUNITY_GROUP_MAP, CommunityGroupId } from '@/lib/constants';
import LoadingBox from '@/components/ui/LoadingBox';
import CommunityHeader from '@/components/community/CommunityHeader';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';

const PostListByGroupPage = ({
  params: { gid },
  searchParams,
}: {
  params: {
    gid: CommunityGroupId;
  };
  searchParams?: { [key: string]: string | undefined };
}) => {
  if (!isValidCommunityGroupId(gid)) {
    redirect('/not-found');
  }

  void api.post.list.prefetchInfinite({
    communityId: gid,
    search: searchParams?.search,
  });

  return (
    <HydrateClient>
      <RootHeader />
      <CommunityHeader communityId={gid} />
      <Suspense fallback={<LoadingBox className="h-full" />}>
        <PostList communityId={gid} searchKeyword={searchParams?.search} />
      </Suspense>
    </HydrateClient>
  );
};

function isValidCommunityGroupId(id: string): id is CommunityGroupId {
  return id in COMMUNITY_GROUP_MAP;
}

export default PostListByGroupPage;
