import { LoaderCircleIcon } from 'lucide-react';

import { usePromise } from '@/hooks/usePromise';

export const imageUploadPromiseMap = new Map<string, Promise<string>>();

export function ImageUploadable({
  src,
  uploadPromise,
  ImageComponent,
}: {
  src: string;
  uploadPromise?: Promise<string>;
  ImageComponent: React.FC<{ src: string }>;
}) {
  const { loading } = usePromise(uploadPromise);

  return (
    <div className="relative">
      <ImageComponent src={src} />
      {loading && (
        <div className="flex-center absolute inset-0 bg-neutral/70">
          <LoaderCircleIcon className="animate-spin" size={32} />
        </div>
      )}
    </div>
  );
}
