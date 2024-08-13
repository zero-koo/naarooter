import { api, RouterOutputs } from '@/trpc/react';
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
  options: Omit<
    Parameters<typeof api.comment.list.useSuspenseInfiniteQuery>[1],
    'getNextPageParam'
  > = {}
) => {
  return api.comment.list.useSuspenseInfiniteQuery(
    {
      postId,
      parentCommentId,
      order: direction,
    },
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNextPage) return undefined;
        return lastPage.comments.at(-1)?.id;
      },
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
  const [postComments] = usePostCommentsQuery({
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
        api.comment.list,
        {
          postId,
          parentCommentId,
          order: direction,
        },
        'infinite'
      ),
      {
        pages: pages ?? postComments?.pages ?? [],
        pageParams: pageParams ?? postComments?.pageParams ?? [],
      }
    );
  }

  return { updatePostCommentsQuery };
};
