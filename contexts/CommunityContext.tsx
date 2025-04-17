'use client';

import { createContext, useContext } from 'react';

type CommunityContext = {
  id: string;
};

const CommunityContext = createContext<CommunityContext | null>(null);

export const CommunityContextProvider = ({
  communityId,
  children,
}: {
  communityId: string;
  children: React.ReactNode;
}) => {
  return (
    <CommunityContext.Provider
      value={{
        id: communityId,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
export const useCommunityContext = () => useContext(CommunityContext)!;
