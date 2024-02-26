import { RouterOutputs, trpc } from '@/client/trpcClient';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostCommentsQuery = (
  {
    postId,
    parentCommentId,
    direction = 'desc',
  }: {
    postId: string;
    parentCommentId?: number;
    direction?: 'asc' | 'desc';
  },
  options: Parameters<typeof trpc.comment.list.useInfiniteQuery>[1] = {}
) => {
  return trpc.comment.list.useInfiniteQuery(
    {
      postId,
      parentCommentId,
      direction,
    },
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNextPage) return undefined;
        return lastPage.comments.at(-1)?.id;
      },
      staleTime: Infinity,
    }
  );
};

export const useUpdatePostCommentsQuery = ({
  postId,
  parentCommentId,
  direction = 'desc',
}: {
  postId: string;
  parentCommentId?: number;
  direction?: 'asc' | 'desc';
}) => {
  const queryClient = useQueryClient();
  const { data } = usePostCommentsQuery({
    postId,
    parentCommentId,
    direction,
  });

  function updatePostCommentsQuery({
    pages,
    pageParams,
  }: Partial<InfiniteData<RouterOutputs['comment']['list']>>) {
    queryClient.setQueryData<InfiniteData<RouterOutputs['comment']['list']>>(
      getQueryKey(
        trpc.comment.list,
        {
          postId,
          parentCommentId,
          direction,
        },
        'infinite'
      ),
      {
        pages: pages ?? data?.pages ?? [],
        pageParams: pageParams ?? data?.pageParams ?? [],
      }
    );
  }

  return { updatePostCommentsQuery };
};
