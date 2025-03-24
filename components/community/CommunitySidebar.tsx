'use client';

import { api } from '@/trpc/react';

import Box from '../ui/Box';
import { Label } from '../ui/Label';

const CommnunitySidebar = ({ communityId }: { communityId: string }) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });
  return (
    <Box className="p-3 text-xs" bordered>
      <div className="mb-2 flex flex-wrap gap-1">
        {community.topics.map((topic) => (
          <Label key={topic.id} size="sm">
            {topic.name}
          </Label>
        ))}
      </div>
      <div className="mb-2">{community.description || community.name}</div>
      <div className="flex items-center gap-0.5 text-xxs text-primary-content/60">
        <span>회원: {community.numUsers}</span>
      </div>
    </Box>
  );
};

export default CommnunitySidebar;
