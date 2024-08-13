import { api } from '@/trpc/react';

export const usePostReactionMutation = () => {
  const { mutate: mutatePostReaction } = api.postReaction.update.useMutation();
  return mutatePostReaction;
};
