import { CommunityContextProvider } from '@/contexts/CommunityContext';
import { api } from '@/trpc/server';

import { PostCreateForm } from '@/components/post/PostCreateForm';

const PostCreatePage = ({ params }: { params: { cid: string } }) => {
  void api.community.myList.prefetch({});

  return (
    <CommunityContextProvider communityId={params.cid}>
      <PostCreateForm communityId={params.cid} />
    </CommunityContextProvider>
  );
};

export default PostCreatePage;
