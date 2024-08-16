import { api } from '@/trpc/react';

export const usePostReactionMutation = () => {
  const { mutate: mutatePostReaction } = api.postReaction.upsert.useMutation();
  return mutatePostReaction;
};
