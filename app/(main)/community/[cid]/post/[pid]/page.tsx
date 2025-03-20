import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import PostShow from '@/components/post/PostShow';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

interface CommunityPageProps {
  params: {
    cid: string;
    pid: string;
  };
}

export default async function CommunityPostPage({
  params,
}: CommunityPageProps) {
  void api.post.byId.prefetch({
    id: params.pid,
  });
  void api.comment.listByPostId.prefetchInfinite({
    postId: params.pid,
    order: 'desc',
  });

  return (
    <HydrateClient>
      <DefaultItemHeader backLink={`/community/${params.cid}`} />
      <Suspense fallback={<PostSkeleton />}>
        <PostShow id={params.pid} />
      </Suspense>
    </HydrateClient>
  );
}
