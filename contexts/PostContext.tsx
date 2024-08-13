import { createContext, useContext } from 'react';
import { Post } from '@/types/post';

import { updateReaction } from '@/lib/reaction';
import { usePostReactionMutation } from '@/hooks/mutations/usePollReactionMutation';
import {
  usePostQuery,
  useUpdatePostQueryData,
} from '@/hooks/queries/usePostQuery';
import { usePostReactionQuery } from '@/hooks/queries/usePostReactionQuery';
import { useReaction } from '@/hooks/useReaction';

type PostContext = {
  id: string;
};

const PostContext = createContext<PostContext | null>(null);

export const PostContextProvider = ({
  postId,
  children,
}: {
  postId: string;
  children: React.ReactNode;
}) => {
  // const [post] = usePostQuery(postId);

  // const updatePostQuery = useUpdatePostQueryData(postId);
  // const mutatePostReaction = usePostReactionMutation();

  // function handleClickLike() {
  //   const updatedReaction = updateReaction(post.reaction, 'like');
  //   updatePostQuery({
  //     ...post,
  //     reaction: updatedReaction,
  //   });
  //   mutatePostReaction({
  //     postId,
  //     type: updatedReaction.userReaction ?? 'cancel',
  //   });
  // }

  // function handleClickDislike() {
  //   const updatedReaction = updateReaction(post.reaction, 'dislike');
  //   updatePostQuery({
  //     ...post,
  //     reaction: updatedReaction,
  //   });
  //   mutatePostReaction({
  //     postId,
  //     type: updatedReaction.userReaction ?? 'cancel',
  //   });
  // }

  return (
    <PostContext.Provider
      value={{
        id: postId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext)!;
