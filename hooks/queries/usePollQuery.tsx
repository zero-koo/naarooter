import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePollQuery = (id: string) => {
  return api.poll.byId.useSuspenseQuery(
    { id },
    {
      staleTime: Infinity,
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdatePollQueryData = (id: string) => {
  const queryClient = useQueryClient();

  return (poll: RouterOutputs['poll']['byId']) =>
    queryClient.setQueryData<RouterOutputs['poll']['byId']>(
      getQueryKey(api.poll.byId, { id }, 'query'),
      poll
    );
};
