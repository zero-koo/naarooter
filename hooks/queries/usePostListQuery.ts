import { trpc } from '@/client/trpcClient';

export const usePostListQuery = ({
  groupId,
  search,
}: {
  groupId?: string;
  search?: string;
}) => {
  return trpc.post.list.useQuery(
    { groupId, search },
    {
      keepPreviousData: true,
      // staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
