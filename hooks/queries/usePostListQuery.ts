import { trpc } from '@/client/trpcClient';

export const usePostListQuery = ({ groupId }: { groupId?: string }) => {
  return trpc.post.list.useQuery(
    { groupId },
    {
      // staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
