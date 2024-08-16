import { api } from '@/trpc/react';

export const usePostListQuery = ({
  groupId,
  search,
  limit,
}: {
  groupId?: string;
  search?: string;
  limit?: number;
}) => {
  return api.post.list.useSuspenseQuery(
    { groupId, search, limit },
    {
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
