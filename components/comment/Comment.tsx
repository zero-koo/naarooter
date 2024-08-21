import { useEffect, useState } from 'react';
import { usePostContext } from '@/contexts/PostContext';
import type { Comment } from '@/server/api/routers/comment/comment.type';
import { api } from '@/trpc/react';
import { CommentContent } from '@/types/shared';
import { CornerDownRightIcon } from 'lucide-react';

import { updateReaction } from '@/lib/reaction';
import {
  usePostCommentsQuery,
  useUpdatePostCommentsQuery,
} from '@/hooks/queries/usePostComentsQuery';
import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useReaction } from '@/hooks/useReaction';
import { useUser } from '@/hooks/useUser';

import { Button } from '../ui/Button';
import CommentReply from './CommentReply';
import CommentView from './CommentView';

type CommentProps = {
  initialData: Comment;
  postId: string;
  onIncreaseCommentsCount: () => void;
  onDecreaseCommentsCount: () => void;
  onDelete: () => void;
};

const Comment = ({
  postId,
  initialData,
  onIncreaseCommentsCount,
  onDecreaseCommentsCount,
  onDelete,
  ...restProps
}: CommentProps) => {
  const { id } = usePostContext();
  const [post] = usePostQuery(id);
  const { user } = useUser();

  const [comment, setComment] = useState<Comment>(initialData);

  const [showReplies, setShowReplies] = useState(
    !!comment.childComments?.length
  );
  const [replies, { hasNextPage, fetchNextPage }] = usePostCommentsQuery(
    {
      postId,
      parentCommentId: comment.id,
      direction: 'asc',
    },
    {
      initialData: () => {
        return {
          pages: [
            {
              comments: comment.childComments ?? [],
              hasNextPage: comment.childComments
                ? comment.childComments.length >= 5
                : false,
              count: comment.childComments?.length ?? 0,
            },
          ],
          pageParams: [],
        };
      },
    }
  );
  const { updatePostCommentsQuery } = useUpdatePostCommentsQuery({
    postId,
    parentCommentId: comment.id,
    direction: 'asc',
  });

  const [newReplies, setNewReplies] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState<number>(
    comment.childCommentCount
  );

  useEffect(() => {
    const lastPage = new Set(
      replies?.pages.at(-1)?.comments.map((comment) => comment.id) ?? []
    );
    if (lastPage.size === 0) return;
    setNewReplies((newReplies) =>
      newReplies.filter((reply) => !lastPage.has(reply.id))
    );
  }, [replies]);

  const { mutateAsync: createComment } = api.comment.create.useMutation();
  async function handleAddComment(content: CommentContent) {
    const reply = await createComment({
      content,
      postId,
      parentCommentId: comment.id,
    });
    onAddReply(reply);
    setShowReplies(true);
  }
  function onAddReply(reply: Comment) {
    setNewReplies((replies) => [...replies, reply]);
    setCommentsCount((count) => count + 1);
    onIncreaseCommentsCount();
  }

  const { mutateAsync: updateComment } = api.comment.update.useMutation();
  async function handleUpdateComment(content: CommentContent) {
    const updatedComment = await updateComment({ id: comment.id, content });
    setComment(updatedComment);
  }

  const { mutateAsync: deleteComment } = api.comment.delete.useMutation();
  async function handleDeleteComment() {
    const deletedComment = await deleteComment({ id: comment.id });

    if (!deletedComment) {
      onDelete();
      return;
    }

    setComment(deletedComment);
  }

  function onDeleteReply(pageIndex: number, id: number) {
    if (!replies) return;
    const pages = [...replies.pages];
    pages[pageIndex] = {
      comments: replies.pages[pageIndex].comments.filter(
        (comment) => comment.id !== id
      ),
      count: replies.pages[pageIndex].count - 1,
      hasNextPage: replies.pages[pageIndex].hasNextPage,
    };
    updatePostCommentsQuery({
      pages,
    });
    setCommentsCount((count) => count - 1);
    onDecreaseCommentsCount();
  }
  function onDeleteNewReply(id: number) {
    setNewReplies((replies) => replies.filter((reply) => reply.id !== id));
    setCommentsCount((count) => count - 1);
    onDecreaseCommentsCount();
  }

  const { mutateAsync: mutateCommentReaction } =
    api.commentReaction.upsert.useMutation();

  const onClickLike = () => {
    const updatedReaction = updateReaction(comment.reaction, 'like');
    mutateCommentReaction({
      type: updatedReaction.selectedReaction ?? null,
      commentId: comment.id,
    });
    setComment((comment) => ({
      ...comment,
      reaction: updatedReaction,
    }));
  };

  const onClickDislike = () => {
    const updatedReaction = updateReaction(comment.reaction, 'dislike');
    mutateCommentReaction({
      type: updatedReaction.selectedReaction ?? null,
      commentId: comment.id,
    });
    setComment((comment) => ({
      ...comment,
      reaction: updatedReaction,
    }));
  };

  return (
    <div>
      <CommentView
        {...restProps}
        {...comment}
        isAuthor={comment.author.id === user?.id}
        isPostAuthor={comment.author.id === post.author.id}
        authorId={comment.author.id}
        authorName={comment.author.name}
        authorMBTI={comment.author.mbti}
        comments={[]}
        likeCount={comment.reaction.likeCount}
        dislikeCount={comment.reaction.dislikeCount}
        selectedReaction={comment.reaction.selectedReaction}
        commentsCount={commentsCount}
        onAddReply={handleAddComment}
        onUpdate={handleUpdateComment}
        onDelete={handleDeleteComment}
        onClickLike={onClickLike}
        onClickDislike={onClickDislike}
        onToggleReplies={() => setShowReplies((flag) => !flag)}
      />
      <div className="flex">
        <div className="flex-1">
          {showReplies && replies ? (
            <>
              {replies?.pages.map((page, index) =>
                page.comments.map((reply) => (
                  <div key={reply.id} className="flex">
                    <div className="py-10 pl-3 pr-2 opacity-70">
                      <CornerDownRightIcon size={12} />
                    </div>

                    <CommentReply
                      reply={reply}
                      postId={postId}
                      parentCommentId={comment.id}
                      onAddReply={onAddReply}
                      onDelete={() => onDeleteReply(index, reply.id)}
                    />
                  </div>
                ))
              )}
              {hasNextPage && (
                <div className="flex py-2">
                  <div className="pl-3 pr-2 opacity-70">
                    <CornerDownRightIcon size={12} />
                  </div>
                  <Button
                    variant="text"
                    size="xs"
                    onClick={() => fetchNextPage()}
                  >
                    답글 더보기
                  </Button>
                </div>
              )}
            </>
          ) : null}
          {showReplies &&
            newReplies.map((reply) => (
              <ReplyWrapper key={reply.id}>
                <CommentReply
                  reply={reply}
                  postId={postId}
                  parentCommentId={comment.id}
                  onAddReply={onAddReply}
                  onDelete={() => onDeleteNewReply(reply.id)}
                />
              </ReplyWrapper>
            ))}
        </div>
      </div>
    </div>
  );
};

function ReplyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="py-10 pl-3 pr-2 opacity-70">
        <CornerDownRightIcon size={12} />
      </div>
      {children}
    </div>
  );
}

export default Comment;
