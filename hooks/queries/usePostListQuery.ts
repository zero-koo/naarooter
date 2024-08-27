import { api } from '@/trpc/react';

export const usePostListQuery = ({
  communityId,
  search,
  limit,
}: {
  communityId?: string;
  search?: string;
  limit?: number;
}) => {
  return api.post.list.useSuspenseQuery(
    { communityId, search, limit },
    {
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
