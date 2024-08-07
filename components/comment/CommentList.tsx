import { trpc } from '@/client/trpcClient';
import { usePostContext } from '@/contexts/PostContext';

import {
  usePostCommentsQuery,
  useUpdatePostCommentsQuery,
} from '@/hooks/queries/usePostComentsQuery';

import GrayBox from '../ui/GrayBox';
import CommentListView from './CommentListView';

const CommentList = () => {
  const { id: postId } = usePostContext();
  const [postComments, { fetchNextPage, hasNextPage }] = usePostCommentsQuery({
    postId,
  });

  const { mutateAsync: addComment } = trpc.comment.add.useMutation();
  async function onAddComment(content: string) {
    const newComment = await addComment({
      postId,
      content,
    });
    onIncreaseCommentsCount();

    if (!postComments.pages.length) {
      updatePostCommentsQuery({
        pages: [
          {
            comments: [newComment],
            totalCount: 1,
            hasNextPage: false,
          },
        ],
      });
      return;
    }

    const pages = [...postComments.pages];
    pages[0] = {
      ...postComments.pages[0],
      comments: [newComment, ...postComments.pages[0].comments],
      totalCount: postComments.pages[0].totalCount + 1,
    };
    updatePostCommentsQuery({
      pages,
    });
  }

  function onDeleteComment(page: number, id: number) {
    if (!postComments) return;
    const pages = [...postComments.pages];
    pages[page] = {
      comments: postComments.pages[page].comments.filter(
        (comment) => comment.id !== id
      ),
      totalCount: postComments.pages[0].totalCount - 1,
      hasNextPage: postComments.pages[0].hasNextPage,
    };
    updatePostCommentsQuery({
      pages: pages,
    });
  }

  const { updatePostCommentsQuery } = useUpdatePostCommentsQuery({
    postId,
  });

  function onIncreaseCommentsCount() {
    if (!postComments) return;
    updatePostCommentsQuery({
      pages: postComments.pages.map((page) => ({
        ...page,
        totalCount: (postComments?.pages[0].totalCount ?? 0) + 1,
      })),
    });
  }

  function onDecreaseCommentsCount() {
    if (!postComments) return;
    updatePostCommentsQuery({
      pages: postComments.pages.map((page) => ({
        ...page,
        totalCount: (postComments?.pages[0].totalCount ?? 0) - 1,
      })),
    });
  }

  return (
    <GrayBox className="px-2 py-3 md:px-3 md:py-4">
      <CommentListView
        postId={postId}
        commentsChunks={postComments.pages}
        commentsCount={postComments.pages[0].totalCount}
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
    </GrayBox>
  );
};

export default CommentList;
