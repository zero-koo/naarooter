import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({
  searchParams,
}: {
  searchParams?: { communityId?: string };
}) => {
  return <PostCreateForm communityId={searchParams?.communityId} />;
};

export default PostCreatePage;
