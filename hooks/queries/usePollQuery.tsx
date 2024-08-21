import { api, RouterOutputs } from '@/trpc/react';

export const usePollQuery = (postId: string) => {
  return api.poll.getByPostId.useSuspenseQuery(
    { postId },
    {
      staleTime: Infinity,
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdatePollQueryData = (postId: string) => {
  const apiUtils = api.useUtils();

  return (poll: RouterOutputs['poll']['getByPostId']) =>
    apiUtils.poll.getByPostId.setData(
      {
        postId,
      },
      poll
    );
};
