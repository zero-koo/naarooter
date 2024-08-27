import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import PostShow from '@/components/post/PostShow';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

const PostPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { communityId?: string };
}) => {
  const listGroupId = searchParams?.communityId;
  void api.post.byId.prefetch({
    id: params.id,
  });
  void api.comment.listByPostId.prefetchInfinite({
    postId: params.id,
    order: 'desc',
  });

  return (
    <HydrateClient>
      <DefaultItemHeader
        backLink={listGroupId ? `/posts/group/${listGroupId}` : '/posts'}
      />
      <Suspense fallback={<PostSkeleton />}>
        <PostShow id={params.id} />
      </Suspense>
    </HydrateClient>
  );
};

export default PostPage;
