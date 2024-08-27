import { useState } from 'react';
import { usePostContext } from '@/contexts/PostContext';
import type { Comment } from '@/server/api/routers/comment/comment.type';
import { api } from '@/trpc/react';
import { CommentContent } from '@/types/shared';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useReaction } from '@/hooks/useReaction';
import { useUser } from '@/hooks/useUser';

import CommentView from './CommentView';

type CommentReplyProps = {
  postId: string;
  parentCommentId: number;
  reply: Comment;
  onAddReply: (reply: Comment) => void;
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

  const { mutateAsync: createComment } = api.comment.create.useMutation();
  async function handleAddReply(content: CommentContent) {
    const comment = await createComment({
      postId,
      parentCommentId,
      content,
      targetUserId: reply.author.id,
    });
    onAddReply(comment);
  }

  const { mutateAsync: updateComment } = api.comment.update.useMutation();
  async function handleUpdateComment(content: CommentContent) {
    const updatedComment = await updateComment({ id: reply.id, content });
    setContent(updatedComment.content);
    setUpdatedAt(updatedComment.updatedAt);
  }

  const { mutateAsync: deleteComment } = api.comment.delete.useMutation();
  async function handleDeleteComment() {
    await deleteComment({ id: reply.id });
    onDelete();
  }

  const { mutateAsync: reactComment } =
    api.commentReaction.upsert.useMutation();
  const {
    likeCount,
    dislikeCount,
    selectedReaction,
    onClickLike,
    onClickDislike,
  } = useReaction({
    initialValue: reply.reaction,
    onUpdate(value) {
      reactComment({
        commentId: reply.id,
        type: value ?? null,
      });
    },
  });

  return (
    <CommentView
      {...reply}
      content={content}
      updatedAt={updatedAt}
      isAuthor={reply.author.id === user?.id}
      isPostAuthor={reply.author.id === post.author.id}
      authorId={reply.author.id}
      authorName={reply.author.name}
      authorMBTI={reply.author.mbti}
      targetUserName={reply.targetUser?.name}
      comments={[]}
      commentsCount={0}
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
