import { RouterOutputs } from '@/client/trpcClient';
import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { createContext, useContext } from 'react';

const PostContext = createContext<RouterOutputs['post']['byId'] | null>(null);

export const PostContextProvider = ({
  postId,
  children,
}: {
  postId: string;
  children: React.ReactNode;
}) => {
  const { data, isLoading } = usePostQuery(postId);

  return (
    <PostContext.Provider value={data}>
      {data ? children : isLoading ? <div>loading...</div> : <div>error</div>}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext)!;
