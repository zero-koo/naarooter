import { createContext, useContext } from 'react';

type RootEditorContextProps = {
  onAddImage?: ({ image }: { image: File }) => Promise<string>;
};
const RootEditorContext = createContext<RootEditorContextProps>({});

export const RootEditorContextProvider = ({
  onAddImage,
  children,
}: React.PropsWithChildren & RootEditorContextProps) => {
  return (
    <RootEditorContext.Provider value={{ onAddImage }}>
      {children}
    </RootEditorContext.Provider>
  );
};

export const useRootEditorContext = () => useContext(RootEditorContext);
