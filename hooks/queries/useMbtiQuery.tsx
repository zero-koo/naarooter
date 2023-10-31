import { RouterOutputs, trpc } from '@/client/trpcClient';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const useMbtiQuery = () => {
  return trpc.user.mbti.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateMbtiQueryData = () => {
  const queryClient = useQueryClient();

  return (mbti: RouterOutputs['user']['mbti']) =>
    queryClient.setQueryData<RouterOutputs['user']['mbti']>(
      getQueryKey(trpc.user.mbti, undefined, 'query'),
      mbti
    );
};
