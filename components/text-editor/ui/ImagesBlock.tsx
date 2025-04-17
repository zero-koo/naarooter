import { useMemo } from 'react';

import { ImageItem } from '../nodes/ImagesNode';
import { ImageCaption } from './ImageCaption';
import ImageCarousel from './ImageCarousel';
import ImageSingleView from './ImageSingleView';

export function ImagesBlock({
  images,
  index,
  hasCaption,
  caption,
  readonly,
  onChangeCaption,
  onRemoveCaption,
}: {
  images: Array<ImageItem>;
  index: number | null;
  hasCaption: boolean;
  caption: string;
  readonly?: boolean;
  onChangeCaption?: (caption: string) => void;
  onRemoveCaption?: () => void;
}) {
  const imageItems = useMemo(() => {
    return images.map((image) => ({
      src: image.blobURL ?? image.srcURL,
      uploadPromise: image.uploadPromise,
    }));
  }, [images]);
  return (
    <div>
      {images.length > 1 ? (
        <ImageCarousel images={imageItems} index={index} readonly={readonly} />
      ) : (
        <ImageSingleView
          src={images[0].blobURL ?? images[0].srcURL}
          uploadPromise={images[0].uploadPromise}
          index={index}
          readonly={readonly}
        />
      )}
      <ImageCaption
        hasCaption={hasCaption}
        readonly={readonly}
        initialValue={caption}
        onChangeCaption={onChangeCaption}
        onRemoveCaption={onRemoveCaption}
      />
    </div>
  );
}
