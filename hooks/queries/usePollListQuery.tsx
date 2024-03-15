import { trpc } from '@/client/trpcClient';

export const usePollListQuery = ({
  search,
}: { search?: string | null } = {}) => {
  return trpc.poll.list.useQuery(
    {
      search,
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
