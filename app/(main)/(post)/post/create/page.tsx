import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({
  searchParams,
}: {
  searchParams?: { communityId?: string };
}) => {
  return <PostCreateForm listGroupId={searchParams?.communityId} />;
};

export default PostCreatePage;
