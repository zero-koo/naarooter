import { trpc } from '@/client/trpcClient';

export const usePostReactionMutation = () => {
  const { mutate: mutatePostReaction } = trpc.postReaction.update.useMutation();
  return mutatePostReaction;
};
