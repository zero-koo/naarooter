import { usePostCommentsQuery } from '@/hooks/queries/usePostComentsQuery';
import PostCommentSectionComponent from './PollCommentSection.component';
import { useToast } from '@/hooks/useToast';
import { useUser } from '@clerk/nextjs';
import { trpc } from '@/client/trpcClient';

interface PostCommentSectionProps {
  postId: string;
  authorId: string;
}

const PostCommentSection = ({ postId, authorId }: PostCommentSectionProps) => {
  const { toast } = useToast();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { data: commentsData } = usePostCommentsQuery({ postId });

  const { mutateAsync: addComment } = trpc.comment.add.useMutation({
    onError() {
      toast.update({
        theme: 'error',
        message: '댓글이 저장되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
  const { mutateAsync: deleteComment } = trpc.comment.delete.useMutation({
    onError() {
      toast.update({
        theme: 'error',
        message: '댓글이 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });

  if (!commentsData || !isUserLoaded) return <div>loading...</div>;

  return (
    <PostCommentSectionComponent
      comments={commentsData?.pages
        .flatMap(({ comments }) => comments)
        .map((comment) => ({
          id: comment.id,
          text: comment.content as string,
          author: {
            id: comment.authorId,
            name: comment.authorName,
            mbti: comment.authorMBTI,
          },
          children: [],
          updatedAt: comment.updatedAt,
          like: comment.likeCount,
          dislike: comment.dislikeCount,
          reaction: comment.userReaction,
        }))}
      totalCount={commentsData.pages[0].totalCount}
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
            id: data.authorId,
            name: data.authorName,
            mbti: data.authorMBTI,
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
