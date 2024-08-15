import { api, ReactQueryOptions } from '@/trpc/react';
import { Post } from '@/types/post';

export const usePostQuery = (
  id: string,
  options?: ReactQueryOptions['postV0']['byId']
) => {
  return api.postV0.byId.useSuspenseQuery(
    { id },
    {
      ...options,
      refetchOnWindowFocus: true,
    }
  );
};

export const useUpdatePostQueryData = (id: string) => {
  const utils = api.useUtils();

  return (post: Post) => utils.postV0.byId.setData({ id }, post);
};
