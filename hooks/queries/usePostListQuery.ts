import { trpc } from '@/client/trpcClient';

export const usePostListQuery = () => {
  return trpc.post.list.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
};
