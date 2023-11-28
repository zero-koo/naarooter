import { RouterOutputs, trpc } from '@/client/trpcClient';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostQuery = (id: string) => {
  const queryClient = useQueryClient();

  return trpc.post.byId.useQuery(
    { id },
    {
      initialData: () => {
        const posts = queryClient.getQueryData<RouterOutputs['post']['list']>(
          getQueryKey(trpc.post.list, {}, 'query')
        );
        return posts?.posts.find((post) => post.id === id);
      },
      staleTime: Infinity,
      cacheTime: 300 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
