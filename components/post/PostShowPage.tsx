import React, { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import MainLayout from '../layouts/MainLayout';
import PostSkeleton from '../skeletons/PostSkeleton';
import PostShow from './PostShow';
import PostShowPageHeader from './PostShowPageHeader';

export default function PostShowPage({
  id,
  aside,
}: {
  id: string;
  aside?: React.ReactNode;
}) {
  void api.post.byId.prefetch({
    id,
  });
  void api.comment.listByPostId.prefetchInfinite({
    postId: id,
    order: 'desc',
  });

  return (
    <HydrateClient>
      <MainLayout
        header={<PostShowPageHeader postId={id} />}
        body={
          <Suspense fallback={<PostSkeleton />}>
            <PostShow id={id} />
          </Suspense>
        }
        aside={aside}
      />
    </HydrateClient>
  );
}
