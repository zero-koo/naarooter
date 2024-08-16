import { api } from '@/trpc/react';
import { Reaction } from '@/types/shared';

export const usePostReactionQuery = (postId: string) => {
  return api.postReaction.countByPostId.useSuspenseQuery({ postId });
};

export const useUpdatePostReactionQuery = (postId: string) => {
  const apiUtils = api.useUtils();

  return (reaction: Reaction) =>
    apiUtils.postReaction.countByPostId.setData(
      {
        postId,
      },
      reaction
    );
};
