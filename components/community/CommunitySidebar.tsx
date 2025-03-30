'use client';

import { api } from '@/trpc/react';

import CommnunityDescription from './CommunityDescription';

const CommnunitySidebar = ({ communityId }: { communityId: string }) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });
  return (
    <CommnunityDescription
      {...community}
      topics={community.topics.map((topic) => topic.name)}
    />
  );
};

export default CommnunitySidebar;
