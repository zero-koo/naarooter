import { Suspense } from 'react';

import LoadingBox from '@/components/ui/LoadingBox';
import { PostEditForm } from '@/components/post/PostEditForm';

const PostEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<LoadingBox />}>
      <PostEditForm id={params.id} />
    </Suspense>
  );
};

export default PostEditPage;
