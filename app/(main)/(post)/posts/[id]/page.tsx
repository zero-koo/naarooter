import { Suspense } from 'react';

import DefaultItemHeader from '@/components/DefaultItemHeader';
import PostShow from '@/components/post/PostShow';
import PostSkeleton from '@/components/skeletons/PostSkeleton';

const PostPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { groupId?: string };
}) => {
  const listGroupId = searchParams?.groupId;
  return (
    <>
      <DefaultItemHeader
        backLink={listGroupId ? `/posts/group/${listGroupId}` : '/posts'}
      />
      <Suspense fallback={<PostSkeleton />}>
        <PostShow id={params.id} />
      </Suspense>
    </>
  );
};

export default PostPage;
