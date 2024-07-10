import { trpc } from '@/client/trpcClient';

export const usePostListQuery = ({
  groupId,
  search,
  limit,
}: {
  groupId?: string;
  search?: string;
  limit?: number;
}) => {
  return trpc.post.list.useSuspenseQuery(
    { groupId, search, limit },
    {
      keepPreviousData: true,
      // staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
