import { api } from '@/trpc/react';

export const usePollListSuspenseInfiniteQuery = ({
  search,
  limit,
}: { search?: string; limit?: number } = {}) => {
  return api.poll.list.useSuspenseInfiniteQuery(
    {
      search,
      limit,
    },
    {
      staleTime: 60_000,
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );
};
