import Image from 'next/image';

import { ImageUploadable } from '@/components/ImageUploadable';

import ImageActionMenu from './ImageActionMenu';
import { ImageIndexLabel } from './ImageIndexLabel';

export default function ImageSingleView({
  src,
  uploadPromise,
  index,
  readonly,
}: {
  src: string;
  uploadPromise?: Promise<string>;
  index: number | null;
  readonly?: boolean;
}) {
  return (
    <div className="relative">
      <ImageUploadable
        src={src}
        uploadPromise={uploadPromise}
        ImageComponent={({ src }) => (
          <Image
            src={src}
            alt={'Image'}
            className="min-h-16 w-full object-contain"
            width={500}
            height={500}
          />
        )}
      />
      {index !== null && <ImageIndexLabel index={index} />}
      {!readonly && <ImageActionMenu />}
    </div>
  );
}
