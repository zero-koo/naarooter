import DefaultListHeader from '@/components/DefaultListHeader';
import RootHeader from '@/components/RootHeader';
import PostList from '@/components/post/PostList';

const PostListPage = () => {
  return (
    <>
      <RootHeader />
      <DefaultListHeader title="전체방" />
      <PostList />
    </>
  );
};

export default PostListPage;
