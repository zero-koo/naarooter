import { trpc } from '@/client/trpcClient';

export const usePollDetailQuery = (id: string) => {
  return trpc.poll.detail.useQuery(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );
};
