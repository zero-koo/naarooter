import { trpc } from '@/client/trpcClient';

import { updateReaction } from '@/lib/reaction';

import { usePostQuery, useUpdatePostQueryData } from './queries/usePostQuery';

export const usePostReaction = (postId: string) => {
  const [post] = usePostQuery(postId);

  const updatePostQuery = useUpdatePostQueryData(postId);
  const { mutate: mutatePostReaction } = trpc.postReaction.update.useMutation();

  function onClickLike() {
    const updatedReaction = updateReaction(post.reaction, 'like');
    updatePostQuery({
      ...post,
      reaction: updatedReaction,
    });
    mutatePostReaction({
      postId,
      type: updatedReaction.userReaction ?? 'cancel',
    });
  }

  function onClickDislike() {
    const updatedReaction = updateReaction(post.reaction, 'dislike');
    updatePostQuery({
      ...post,
      reaction: updatedReaction,
    });
    mutatePostReaction({
      postId,
      type: updatedReaction.userReaction ?? 'cancel',
    });
  }

  return {
    ...post.reaction,
    selectedReaction: post.reaction.userReaction,
    onClickLike,
    onClickDislike,
  };
};
