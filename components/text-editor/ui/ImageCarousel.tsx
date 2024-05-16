import ImageSquareView from '@/components/ImageSquareView';
import { ImageEditableWrapper } from './ImageEditableWrapper';
import { ImageUploadable } from '@/components/ImageUploadable';
import { useRef } from 'react';

type ImageCarouselProps = {
  images: Array<{
    src: string;
    uploadPromise?: Promise<string>;
  }>;
  index: number | null;
  hasCaption?: boolean;
  readonly?: boolean;
  onAddImages?: (images: File[], at: number) => void;
  onRemove?: (subIndex: number) => void;
  onToggleCaption?: (hasCaption: boolean) => void;
};

export function ImageCarousel({
  images,
  index,
  hasCaption,
  readonly,
  onAddImages,
  onRemove,
  onToggleCaption,
}: ImageCarouselProps) {
  return (
    <div className="carousel flex w-full gap-2 py-0">
      {images.map(({ src, uploadPromise }, subIndex) => (
        <div className="carousel-item relative" key={`${index}-${subIndex}`}>
          <ImageEditableWrapper
            indexLabel={
              index == null ? `${subIndex + 1}` : `${index + 1}-${subIndex + 1}`
            }
            hasCaption={hasCaption}
            imagesCount={images.length}
            readonly={readonly}
            onAddImages={(images: File[]) => onAddImages?.(images, subIndex)}
            onToggleCaption={onToggleCaption}
            onRemove={() => onRemove?.(subIndex)}
          >
            <ImageUploadable
              src={src}
              uploadPromise={uploadPromise}
              ImageComponent={(
                params: React.ComponentProps<typeof ImageSquareView>
              ) => ImageSquareView({ ...params, size: 'xl' })}
            />
          </ImageEditableWrapper>
        </div>
      ))}
    </div>
  );
}
