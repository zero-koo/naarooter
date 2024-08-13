import { api } from '@/trpc/react';

export const usePollListQuery = ({
  search,
  limit,
}: { search?: string | null; limit?: number } = {}) => {
  return api.poll.list.useSuspenseQuery(
    {
      search,
      limit,
    },
    {
      staleTime: Infinity,
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
