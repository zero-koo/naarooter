import { ImageUploadable } from '@/components/ImageUploadable';
import { ImageIndexLabel } from './ImageIndexLabel';
import ImageActionMenu from './ImageActionMenu';
import Image from 'next/image';

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
            className="w-full"
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
