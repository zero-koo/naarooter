import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import MainLayout from '../layouts/MainLayout';
import PollPageHeader from './PollPageHeader';
import PollShow from './PollShow';
import PostSkeleton from '../skeletons/PostSkeleton';

const PollPage = ({ postId }: { postId: string }) => {
  void api.post.byId.prefetch({
    id: postId,
  });
  void api.poll.getByPostId.prefetch({
    postId,
  });
  void api.comment.listByPostId.prefetchInfinite({
    postId,
    order: 'desc',
  });

  return (
    <HydrateClient>
      <MainLayout
        header={<PollPageHeader postId={postId} />}
        body={
          <Suspense fallback={<PostSkeleton />}>
            <PollShow postId={postId} />
          </Suspense>
        }
      />
    </HydrateClient>
  );
};

export default PollPage;
