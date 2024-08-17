import { api } from '@/trpc/react';

import { usePostCommentsQuery } from '@/hooks/queries/usePostComentsQuery';
import { useToast } from '@/hooks/useToast';
import { useUser } from '@/hooks/useUser';

import PostCommentSectionComponent from './PollCommentSection.component';

interface PostCommentSectionProps {
  postId: string;
  authorId: string;
}

const PostCommentSection = ({ postId, authorId }: PostCommentSectionProps) => {
  const { toast } = useToast();
  const { user } = useUser();

  const [postComments] = usePostCommentsQuery({ postId });

  const { mutateAsync: addComment } = api.comment.create.useMutation({
    onError() {
      toast.update({
        theme: 'error',
        message: '댓글이 저장되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
  const { mutateAsync: deleteComment } = api.comment.delete.useMutation({
    onError() {
      toast.update({
        theme: 'error',
        message: '댓글이 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });

  return (
    <PostCommentSectionComponent
      comments={postComments?.pages
        .flatMap(({ comments }) => comments)
        .map((comment) => ({
          id: comment.id,
          text: comment.content as string,
          author: {
            id: comment.author.id,
            name: comment.author.name ?? null,
            mbti: comment.author.mbti,
          },
          children: [],
          updatedAt: comment.updatedAt,
          like: comment.reaction.likeCount,
          dislike: comment.reaction.dislikeCount,
          reaction: comment.reaction.selectedReaction,
        }))}
      totalCount={postComments.pages[0].count}
      userId={user?.id}
      postAuthorId={authorId}
      onAdd={async ({ text }) => {
        const data = await addComment({
          postId,
          content: text,
        });

        return {
          id: data.id,
          author: {
            id: data.author.id,
            name: data.author.name,
            mbti: data.author.mbti,
          },
          text: data.content as string,
          updatedAt: data.updatedAt,
          like: 0,
          dislike: 0,
          reaction: null,
          children: [],
        };
      }}
      onDelete={async ({ commentId }) => {
        await deleteComment({ id: commentId });
      }}
    />
  );
};

export default PostCommentSection;
