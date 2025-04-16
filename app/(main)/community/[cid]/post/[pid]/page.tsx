import { Suspense } from 'react';

import CommunitySidebar from '@/components/community/CommunitySidebar';
import PostShowPage from '@/components/post/PostShowPage';

interface CommunityPageProps {
  params: {
    cid: string;
    pid: string;
  };
}

export default async function CommunityPostPage({
  params,
}: CommunityPageProps) {
  return (
    <PostShowPage
      id={params.pid}
      aside={
        <Suspense>
          <CommunitySidebar communityId={params.cid} />
        </Suspense>
      }
    />
  );
}
