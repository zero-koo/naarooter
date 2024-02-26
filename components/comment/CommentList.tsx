import {
  usePostCommentsQuery,
  useUpdatePostCommentsQuery,
} from '@/hooks/queries/usePostComentsQuery';
import CommentListView from './CommentListView';
import { trpc } from '@/client/trpcClient';
import { Button } from '../ui/Button';

const CommentList = ({ postId }: { postId: string }) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    usePostCommentsQuery({
      postId,
    });

  const { mutateAsync: addComment } = trpc.comment.add.useMutation();
  async function onAddComment(content: string) {
    const newComment = await addComment({
      postId,
      content,
    });
    onIncreaseCommentsCount();

    if (!data) return;
    updatePostCommentsQuery({
      pages: data.pages.with(0, {
        ...data.pages[0],
        comments: [newComment, ...data.pages[0].comments],
        totalCount: data.pages[0].totalCount + 1,
      }) ?? [
        {
          comments: [newComment],
          nextCursor: undefined,
          totalCount: 1,
        },
      ],
    });
  }

  function onDeleteComment(page: number, id: number) {
    if (!data) return;
    updatePostCommentsQuery({
      pages: data.pages.with(page, {
        comments: data.pages[page].comments.filter(
          (comment) => comment.id !== id
        ),
        totalCount: data.pages[0].totalCount - 1,
        hasNextPage: data.pages[0].hasNextPage,
      }),
    });
  }

  const { updatePostCommentsQuery } = useUpdatePostCommentsQuery({ postId });

  function onIncreaseCommentsCount() {
    console.log('onIncreateComment');
    if (!data) return;
    updatePostCommentsQuery({
      pages: data.pages.map((page) => ({
        ...page,
        totalCount: (data?.pages[0].totalCount ?? 0) + 1,
      })),
    });
  }

  function onDecreaseCommentsCount() {
    if (!data) return;
    updatePostCommentsQuery({
      pages: data.pages.map((page) => ({
        ...page,
        totalCount: (data?.pages[0].totalCount ?? 0) - 1,
      })),
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <>
      <CommentListView
        postId={postId}
        commentsChunks={data.pages}
        commentsCount={data.pages[0].totalCount}
        onAddComment={onAddComment}
        onDelete={onDeleteComment}
        onIncreaseCommentsCount={onIncreaseCommentsCount}
        onDecreaseCommentsCount={onDecreaseCommentsCount}
      />
      {hasNextPage && (
        <button
          className="flex w-full justify-center bg-base-100 py-1.5 text-center text-xs"
          onClick={() => fetchNextPage()}
        >
          더보기
        </button>
      )}
    </>
  );
};

export default CommentList;
