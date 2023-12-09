import PostList from '@/components/post/PostList';

const PostListByGroupPage = ({ params }: { params: { gid: string } }) => {
  return <PostList groupId={params.gid} />;
};

export default PostListByGroupPage;
