import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { COMMUNITY_GROUP_MAP, CommunityGroupId } from '@/lib/constants';
import CommunityHeader from '@/components/community/CommunityHeader';
import PostList from '@/components/post/PostList';
import RootHeader from '@/components/RootHeader';
import PostListSkeleton from '@/components/skeletons/PostListSkeleton';

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

  return (
    <>
      <RootHeader />
      <CommunityHeader title={COMMUNITY_GROUP_MAP[gid].title} />
      <Suspense fallback={<PostListSkeleton count={20} />}>
        <PostList groupId={gid} searchKeyword={searchParams?.search} />
      </Suspense>
    </>
  );
};

function isValidCommunityGroupId(id: string): id is CommunityGroupId {
  return id in COMMUNITY_GROUP_MAP;
}

export default PostListByGroupPage;
