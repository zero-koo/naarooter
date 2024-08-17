import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostCommentQuery = ({
  id,
  postId,
}: {
  id: number;
  postId: string;
}) => {
  const queryClient = useQueryClient();

  return api.comment.byId.useQuery(
    { id },
    {
      initialData: () => {
        const comments = queryClient.getQueryData<{
          pages: Array<RouterOutputs['comment']['listByPostId']>;
        }>(getQueryKey(api.comment.listByPostId, { postId }, 'infinite'));
        return comments?.pages
          .flatMap(({ comments }) => comments)
          .find((comment) => comment.id === id);
      },
      staleTime: Infinity,
      gcTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
