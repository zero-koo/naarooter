import { PostEditForm } from '@/components/post/PostEditForm';

const PostEditPage = ({ params }: { params: { id: string } }) => {
  return <PostEditForm id={params.id} />;
};

export default PostEditPage;
