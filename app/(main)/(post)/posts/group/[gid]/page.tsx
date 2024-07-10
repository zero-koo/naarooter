import DefaultListHeader from '@/components/DefaultListHeader';
import RootHeader from '@/components/RootHeader';
import PostList from '@/components/post/PostList';
import PostListSkeleton from '@/components/skeletons/PostListSkeleton';
import { COMMUNITY_GROUP_MAP, CommunityGroupId } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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
      <DefaultListHeader title={COMMUNITY_GROUP_MAP[gid].title} />
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
