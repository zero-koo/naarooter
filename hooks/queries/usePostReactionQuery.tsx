import { api } from '@/trpc/react';
import { Reaction } from '@/types/shared';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostReactionQuery = (postId: string) => {
  return api.postReaction.byId.useSuspenseQuery({ postId });
};

export const useUpdatePostReactionQuery = (postId: string) => {
  const queryClient = useQueryClient();

  return (reaction: Reaction) =>
    queryClient.setQueryData<Reaction>(
      getQueryKey(api.postReaction.byId, { postId }, 'query'),
      reaction
    );
};
