import { Suspense } from 'react';
import { CommunityContextProvider } from '@/contexts/CommunityContext';

import LoadingBox from '@/components/ui/LoadingBox';
import { PostEditForm } from '@/components/post/PostEditForm';

const PostEditPage = ({ params }: { params: { cid: string; pid: string } }) => {
  return (
    <CommunityContextProvider communityId={params.cid}>
      <Suspense fallback={<LoadingBox />}>
        <PostEditForm id={params.pid} />
      </Suspense>
    </CommunityContextProvider>
  );
};

export default PostEditPage;
