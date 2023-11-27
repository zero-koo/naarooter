import { RouterOutputs, trpc } from '@/client/trpcClient';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const useUserQuery = () => {
  return trpc.user.me.useQuery(undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserQueryData = () => {
  const queryClient = useQueryClient();

  return (user: RouterOutputs['user']['me']) =>
    queryClient.setQueryData<RouterOutputs['user']['me']>(
      getQueryKey(trpc.user.me, undefined, 'query'),
      user
    );
};
