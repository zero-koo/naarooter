import PostList from '@/components/post/PostList';

const PostListPage = ({ params }: { params: { gid: string } }) => {
  return <PostList groupId={params.gid} />;
};

export default PostListPage;
