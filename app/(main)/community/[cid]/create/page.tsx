import { api } from '@/trpc/server';

import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({ params }: { params: { cid: string } }) => {
  void api.community.myList.prefetch({});

  return <PostCreateForm communityId={params.cid} />;
};

export default PostCreatePage;
