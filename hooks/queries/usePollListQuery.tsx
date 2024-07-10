import { trpc } from '@/client/trpcClient';

export const usePollListQuery = ({
  search,
  limit,
}: { search?: string | null; limit?: number } = {}) => {
  return trpc.poll.list.useSuspenseQuery(
    {
      search,
      limit,
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
