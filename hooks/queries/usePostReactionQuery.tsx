import { trpc } from '@/client/trpcClient';
import { Reaction } from '@/types/shared';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostReactionQuery = (postId: string) => {
  return trpc.postReaction.byId.useSuspenseQuery({ postId });
};

export const useUpdatePostReactionQuery = (postId: string) => {
  const queryClient = useQueryClient();

  return (reaction: Reaction) =>
    queryClient.setQueryData<Reaction>(
      getQueryKey(trpc.postReaction.byId, { postId }, 'query'),
      reaction
    );
};
