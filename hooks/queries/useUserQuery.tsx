import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const useUserQuery = () => {
  return api.user.me.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserQueryData = () => {
  const queryClient = useQueryClient();

  return (user: RouterOutputs['user']['me']) =>
    queryClient.setQueryData<RouterOutputs['user']['me']>(
      getQueryKey(api.user.me, undefined, 'query'),
      user
    );
};
