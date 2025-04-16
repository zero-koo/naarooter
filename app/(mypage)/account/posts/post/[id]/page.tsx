import PostShowPage from '@/components/post/PostShowPage';

const PostPage = async ({ params }: { params: { id: string } }) => {
  return <PostShowPage id={params.id} />;
};

export default PostPage;
