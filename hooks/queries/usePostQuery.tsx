import { Post } from '@/server/api/routers/post/post.type';
import { api, ReactQueryOptions } from '@/trpc/react';

export const usePostQuery = (
  id: string,
  options?: ReactQueryOptions['post']['byId']
) => {
  return api.post.byId.useSuspenseQuery(
    { id },
    {
      ...options,
      refetchOnWindowFocus: true,
    }
  );
};

export const useUpdatePostQueryData = (id: string) => {
  const apiUtils = api.useUtils();

  return (post: Post) => apiUtils.post.byId.setData({ id }, post);
};
