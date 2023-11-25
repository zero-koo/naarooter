import { trpc } from '@/client/trpcClient';

export const usePollListQuery = () => {
  return trpc.poll.list.useQuery(
    {},
    {
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
