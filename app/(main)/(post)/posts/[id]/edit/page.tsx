import { PostEditForm } from '@/components/post/PostEditForm';
import LoadingBox from '@/components/ui/LoadingBox';
import { Suspense } from 'react';

const PostEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<LoadingBox />}>
      <PostEditForm id={params.id} />
    </Suspense>
  );
};

export default PostEditPage;
