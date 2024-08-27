import { api } from '@/trpc/react';

export const usePostListSuspenseInfiniteQuery = ({
  communityId,
  search,
  limit,
}: {
  communityId?: string;
  search?: string;
  limit?: number;
}) => {
  return api.post.list.useSuspenseInfiniteQuery(
    { communityId, search, limit },
    {
      staleTime: 60_000,
      gcTime: 300_000,
      refetchOnWindowFocus: false,
      getNextPageParam({ nextCursor }) {
        return nextCursor;
      },
    }
  );
};
