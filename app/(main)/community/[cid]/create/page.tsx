import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({ params }: { params: { cid: string } }) => {
  return <PostCreateForm communityId={params.cid} />;
};

export default PostCreatePage;
