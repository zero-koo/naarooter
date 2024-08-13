import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const useMbtiQuery = () => {
  return api.user.mbti.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateMbtiQueryData = () => {
  const queryClient = useQueryClient();

  return (mbti: RouterOutputs['user']['mbti']) =>
    queryClient.setQueryData<RouterOutputs['user']['mbti']>(
      getQueryKey(api.user.mbti, undefined, 'query'),
      mbti
    );
};
