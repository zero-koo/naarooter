import { trpc } from '@/client/trpcClient';

export const usePollListQuery = () => {
  return trpc.poll.list.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
};
