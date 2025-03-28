import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import MainLayout from '@/components/layouts/MainLayout';
import PollPage from '@/components/poll/PollPage';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

interface PollPageProps {
  params: {
    id: string;
  };
}

export default function Poll({ params }: PollPageProps) {
  void api.post.byId.prefetch({
    id: params.id,
  });
  void api.poll.getByPostId.prefetch({
    postId: params.id,
  });
  void api.comment.listByPostId.prefetchInfinite({
    postId: params.id,
    order: 'desc',
  });

  return (
    <HydrateClient>
      <Suspense
        fallback={
          <MainLayout
            header={<DefaultItemHeader backLink={'/polls'} />}
            body={<PostSkeleton />}
          />
        }
      >
        <PollPage id={params.id} />
      </Suspense>
    </HydrateClient>
  );
}
