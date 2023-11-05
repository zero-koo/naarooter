import { trpc } from '@/client/trpcClient';

export const usePollCommentsQuery = ({ pollId }: { pollId: string }) => {
  return trpc.comment.comments.useInfiniteQuery(
    {
      pollId,
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
