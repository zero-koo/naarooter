import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({ params }: { params: { cid: string } }) => {
  return <PostCreateForm listGroupId={params.cid} />;
};

export default PostCreatePage;
