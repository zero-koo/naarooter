'use client';

import { api } from '@/trpc/react';

import Box from '../ui/Box';

const CommnunitySidebar = ({ communityId }: { communityId: string }) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });
  return (
    <Box className="p-2 text-xs" bordered>
      {community.description}
    </Box>
  );
};

export default CommnunitySidebar;
