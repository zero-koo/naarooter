import CommunityHeader from '@/components/CommunityHeader';
import RootHeader from '@/components/RootHeader';
import PostList from '@/components/post/PostList';

const PostListPage = () => {
  return (
    <>
      <RootHeader />
      <CommunityHeader title="전체방" />
      <PostList />
    </>
  );
};

export default PostListPage;
