import { createContext, useContext } from 'react';

type RootEditorContext = {
  onAddImage: (image: File | string) => Promise<string>;
};

const Context = createContext<RootEditorContext>({
  onAddImage(image) {
    return Promise.resolve(
      typeof image === 'string' ? image : URL.createObjectURL(image)
    );
  },
});

export function RootEditorContextProvider({
  onAddImage,
  children,
}: React.PropsWithChildren<Partial<RootEditorContext>>) {
  return (
    <Context.Provider
      value={{
        onAddImage:
          onAddImage ??
          ((image) =>
            Promise.resolve(
              typeof image === 'string' ? image : URL.createObjectURL(image)
            )),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useRootEditorContext() {
  return useContext(Context);
}
