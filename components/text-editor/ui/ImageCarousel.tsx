import React from 'react';

import ImageSquareView from '@/components/ImageSquareView';
import { ImageUploadable } from '@/components/ImageUploadable';

import ImageActionMenu from './ImageActionMenu';
import { ImageIndexLabel } from './ImageIndexLabel';

type ImageCarouselProps = {
  images: Array<{
    src: string;
    uploadPromise?: Promise<string>;
  }>;
  index: number | null;
  readonly?: boolean;
};

function ImageCarousel({ images, index, readonly }: ImageCarouselProps) {
  return (
    <div className="carousel flex w-full gap-2 py-0">
      {images.map(({ src, uploadPromise }, subIndex) => (
        <div className="carousel-item relative" key={`${index}-${subIndex}`}>
          <ImageUploadable
            src={src}
            uploadPromise={uploadPromise}
            ImageComponent={(
              params: React.ComponentProps<typeof ImageSquareView>
            ) => ImageSquareView({ ...params, size: 'xl' })}
          />
          {index !== null && (
            <ImageIndexLabel index={index} subIndex={subIndex} />
          )}
          {!readonly && <ImageActionMenu subIndex={subIndex} />}
        </div>
      ))}
    </div>
  );
}

export default React.memo(ImageCarousel);
