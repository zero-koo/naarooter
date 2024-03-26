import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({
  searchParams,
}: {
  searchParams?: { groupId?: string };
}) => {
  return <PostCreateForm listGroupId={searchParams?.groupId} />;
};

export default PostCreatePage;
