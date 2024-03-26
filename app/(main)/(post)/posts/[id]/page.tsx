import PostShow from '@/components/post/PostShow';

const PostPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { groupId?: string };
}) => {
  return <PostShow id={params.id} listGroupId={searchParams?.groupId} />;
};

export default PostPage;
