import { trpc } from '@/client/trpcClient';

export const usePostCommentsQuery = ({ postId }: { postId: string }) => {
  return trpc.comment.comments.useInfiniteQuery(
    {
      postId,
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
