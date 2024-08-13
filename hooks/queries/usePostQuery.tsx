import { api, ReactQueryOptions } from '@/trpc/react';
import { Post } from '@/types/post';

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
  const utils = api.useUtils();

  return (post: Post) => utils.post.byId.setData({ id }, post);
};
