import React from 'react';

import ImageSquareView from '@/components/ImageSquareView';
import { ImageUploadable } from '@/components/ImageUploadable';

type ImageCarouselProps = {
  images: Array<{
    src: string | File;
    uploadPromise?: Promise<string>;
  }>;
  chilrenPerItem?: React.FC<{ index: number }>;
};

function ImageCarousel({
  images,
  chilrenPerItem: ChildPerItem,
}: React.PropsWithChildren<ImageCarouselProps>) {
  return (
    <div className="carousel flex w-full gap-2 py-0">
      {images.map(({ src, uploadPromise }, index) => (
        <div className="carousel-item relative" key={index}>
          <ImageUploadable
            src={typeof src === 'string' ? src : URL.createObjectURL(src)}
            uploadPromise={uploadPromise}
            ImageComponent={(
              params: React.ComponentProps<typeof ImageSquareView>
            ) => ImageSquareView({ ...params, size: 'xl' })}
          />
          {ChildPerItem && <ChildPerItem index={index} />}
        </div>
      ))}
    </div>
  );
}

export default React.memo(ImageCarousel);
