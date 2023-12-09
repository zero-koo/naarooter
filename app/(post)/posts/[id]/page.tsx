import PostShow from '@/components/post/PostShow';

const PostPage = ({ params }: { params: { id: string } }) => {
  return <PostShow id={params.id} />;
};

export default PostPage;
