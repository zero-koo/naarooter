import { createContext, useContext } from 'react';

type PostContext = {
  id: string;
};

const PostContext = createContext<PostContext | null>(null);

export const PostContextProvider = ({
  postId,
  children,
}: {
  postId: string;
  children: React.ReactNode;
}) => {
  return (
    <PostContext.Provider
      value={{
        id: postId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext)!;
