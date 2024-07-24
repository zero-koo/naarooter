import { trpc } from '@/client/trpcClient';
import { Post } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const usePostQuery = (id: string) => {
  return trpc.post.byId.useSuspenseQuery(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdatePostQueryData = (id: string) => {
  const queryClient = useQueryClient();

  return (post: Post) =>
    queryClient.setQueryData<Post>(
      getQueryKey(trpc.post.byId, { id }, 'query'),
      post
    );
};
