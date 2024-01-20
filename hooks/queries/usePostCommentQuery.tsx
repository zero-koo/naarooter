import { RouterOutputs, trpc } from '@/client/trpcClient';
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

  return trpc.comment.byId.useQuery(
    { id },
    {
      initialData: () => {
        const comments = queryClient.getQueryData<{
          pages: Array<RouterOutputs['comment']['list']>;
        }>(getQueryKey(trpc.comment.list, { postId }, 'infinite'));
        return comments?.pages
          .flatMap(({ comments }) => comments)
          .find((comment) => comment.id === id);
      },
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
