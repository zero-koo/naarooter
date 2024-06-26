import { RouterOutputs, trpc } from '@/client/trpcClient';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePollQuery = (id: string, initialData?: any) => {
  const queryClient = useQueryClient();

  return trpc.poll.byId.useQuery(
    { id },
    {
      initialData: () => {
        if (initialData) return initialData;
        const polls = queryClient.getQueryData<RouterOutputs['poll']['list']>(
          getQueryKey(trpc.poll.list, {}, 'query')
        );
        return polls?.items.find((item) => item.id === id);
      },
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdatePollQueryData = (id: string) => {
  const queryClient = useQueryClient();

  return (poll: RouterOutputs['poll']['byId']) =>
    queryClient.setQueryData<RouterOutputs['poll']['byId']>(
      getQueryKey(trpc.poll.byId, { id }, 'query'),
      poll
    );
};
