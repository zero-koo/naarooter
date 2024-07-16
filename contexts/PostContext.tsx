import { createContext, useContext } from 'react';
import { RouterOutputs } from '@/client/trpcClient';

import { usePostQuery } from '@/hooks/queries/usePostQuery';

const PostContext = createContext<RouterOutputs['post']['byId'] | null>(null);

export const PostContextProvider = ({
  postId,
  children,
}: {
  postId: string;
  children: React.ReactNode;
}) => {
  const [post] = usePostQuery(postId);

  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};
export const usePostContext = () => useContext(PostContext)!;
