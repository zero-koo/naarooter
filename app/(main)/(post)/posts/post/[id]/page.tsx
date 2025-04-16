import { Suspense } from 'react';
import { api, HydrateClient } from '@/trpc/server';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import MainLayout from '@/components/layouts/MainLayout';
import PostShowPage from '@/components/post/PostShowPage';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

const PostPage = async ({ params }: { params: { id: string } }) => {
  void api.post.byId.prefetch({
    id: params.id,
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
            header={<DefaultItemHeader backLink={'/'} />}
            body={<PostSkeleton />}
          />
        }
      >
        <PostShowPage id={params.id} />
      </Suspense>
    </HydrateClient>
  );
};

export default PostPage;
