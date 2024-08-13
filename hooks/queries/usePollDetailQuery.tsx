import { api } from '@/trpc/react';

export const usePollDetailQuery = (id: string) => {
  return api.poll.detail.useQuery(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );
};
