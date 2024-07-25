import { useState } from 'react';
import { trpc } from '@/client/trpcClient';
import { usePostContext } from '@/contexts/PostContext';
import { CommentContent, TComment } from '@/types/shared';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useReaction } from '@/hooks/useReaction';
import { useUser } from '@/hooks/useUser';

import CommentView from './CommentView';

type CommentReplyProps = {
  postId: string;
  parentCommentId: number;
  reply: TComment;
  onAddReply: (reply: TComment) => void;
  onDelete: () => void;
};

const CommentReply = ({
  postId,
  parentCommentId,
  reply,
  onAddReply,
  onDelete,
}: CommentReplyProps) => {
  const { user } = useUser();

  const { id } = usePostContext();
  const [post] = usePostQuery(id);

  const [content, setContent] = useState<CommentContent>(reply.content);
  const [updatedAt, setUpdatedAt] = useState<Date>(reply.updatedAt);

  const { mutateAsync: createComment } = trpc.comment.add.useMutation();
  async function handleAddReply(content: CommentContent) {
    const comment = await createComment({
      postId,
      parentId: parentCommentId,
      content,
      targetUserId: reply.authorId,
    });
    onAddReply(comment);
  }

  const { mutateAsync: updateComment } = trpc.comment.update.useMutation();
  async function handleUpdateComment(content: CommentContent) {
    const updatedComment = await updateComment({ id: reply.id, content });
    setContent(updatedComment.content);
    setUpdatedAt(updatedComment.updatedAt);
  }

  const { mutateAsync: deleteComment } = trpc.comment.delete.useMutation();
  async function handleDeleteComment() {
    await deleteComment({ id: reply.id });
    onDelete();
  }

  const { mutateAsync: reactComment } = trpc.comment.reaction.useMutation();
  const {
    likeCount,
    dislikeCount,
    selectedReaction,
    onClickLike,
    onClickDislike,
  } = useReaction({
    initialValue: reply,
    onUpdate(value) {
      reactComment({
        commentId: reply.id,
        type: value ?? 'cancel',
      });
    },
  });

  return (
    <CommentView
      {...reply}
      content={content}
      updatedAt={updatedAt}
      isAuthor={reply.authorId === user?.id}
      isPostAuthor={reply.authorId === post.author.id}
      likeCount={likeCount}
      dislikeCount={dislikeCount}
      selectedReaction={selectedReaction}
      hideReplyCount
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
      onAddReply={handleAddReply}
      onUpdate={handleUpdateComment}
      onDelete={handleDeleteComment}
    />
  );
};

export default CommentReply;
