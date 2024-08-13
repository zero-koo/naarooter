import { api } from '@/trpc/react';

import { updateReaction } from '@/lib/reaction';

import { usePostQuery, useUpdatePostQueryData } from './queries/usePostQuery';

export const usePostReaction = (postId: string) => {
  const [post] = usePostQuery(postId);

  const updatePostQuery = useUpdatePostQueryData(postId);
  const { mutate: mutatePostReaction } = api.postReaction.update.useMutation();

  function onClickLike() {
    const updatedReaction = updateReaction(post.reaction, 'like');
    updatePostQuery({
      ...post,
      reaction: updatedReaction,
    });
    mutatePostReaction({
      postId,
      type: updatedReaction.selectedReaction ?? 'cancel',
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
      type: updatedReaction.selectedReaction ?? 'cancel',
    });
  }

  return {
    ...post.reaction,
    onClickLike,
    onClickDislike,
  };
};
