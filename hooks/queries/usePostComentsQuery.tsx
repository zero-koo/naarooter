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
    Parameters<typeof api.comment.listByPostId.useSuspenseInfiniteQuery>[1],
    'getNextPageParam'
  > = {}
) => {
  return api.comment.listByPostId.useSuspenseInfiniteQuery(
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
      refetchOnWindowFocus: false,
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
  }: Partial<InfiniteData<RouterOutputs['comment']['listByPostId']>>) {
    queryClient.setQueryData<
      InfiniteData<RouterOutputs['comment']['listByPostId']>
    >(
      getQueryKey(
        api.comment.listByPostId,
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
