import { createContext, useContext, useMemo } from 'react';
import { MAX_IMAGE_COUNT_PER_CAROUSEL } from '../constants';
import { uploadImages } from '@/lib/utils';

type ImageActionMenuContextType = {
  imageCount: number;
  hasCaption: boolean;
  onClickAdd(subIndex: number): void;
  onClickRemove(subIndex: number): void;
  onClickCaption(): void;
};

const ImageActionMenuContext = createContext<ImageActionMenuContextType | null>(
  null
);

export const ImageActionMenuContextProvider = ({
  children,
  imageCount,
  hasCaption,
  onAddImages,
  onRemoveImage,
  onToggleCaption,
}: React.PropsWithChildren<{
  imageCount: number;
  hasCaption: boolean;
  onAddImages: (images: File[], subIndex: number) => void;
  onRemoveImage: (subIndex: number) => void;
  onToggleCaption: () => void;
}>) => {
  const imageActionMenuContext: ImageActionMenuContextType = useMemo(() => {
    return {
      imageCount,
      hasCaption,
      onClickAdd(subIndex: number) {
        uploadImages({
          maxCount: MAX_IMAGE_COUNT_PER_CAROUSEL - imageCount,
          onUpload: (images) => onAddImages(images, subIndex),
        });
      },
      onClickRemove(subIndex: number) {
        onRemoveImage(subIndex);
      },
      onClickCaption() {
        onToggleCaption();
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageCount, hasCaption]);

  return (
    <ImageActionMenuContext.Provider value={imageActionMenuContext}>
      {children}
    </ImageActionMenuContext.Provider>
  );
};

export const useImageActionMenuContext = () => {
  const context = useContext(ImageActionMenuContext);

  if (context === null) {
    throw Error('Cannot finde a ImageActionMenuContext');
  }

  return context;
};
