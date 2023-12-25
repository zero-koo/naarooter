import CommunityHeader from '@/components/CommunityHeader';
import RootHeader from '@/components/RootHeader';
import PostList from '@/components/post/PostList';
import { COMMUNITY_GROUP_MAP, CommunityGroupId } from '@/lib/constants';
import { redirect } from 'next/navigation';

const PostListByGroupPage = ({
  params: { gid },
}: {
  params: { gid: CommunityGroupId };
}) => {
  if (!isValidCommunityGroupId(gid)) {
    redirect('/not-found');
  }

  return (
    <>
      <RootHeader />
      <CommunityHeader title={COMMUNITY_GROUP_MAP[gid].title} />
      <PostList groupId={gid} />
    </>
  );
};

function isValidCommunityGroupId(id: string): id is CommunityGroupId {
  return id in COMMUNITY_GROUP_MAP;
}

export default PostListByGroupPage;