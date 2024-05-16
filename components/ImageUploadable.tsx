import { useEffect, useState } from 'react';
import { LoaderCircleIcon } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uploadPromise) {
      setLoading(false);
      return;
    }
    uploadPromise?.then(() => setLoading(false));
  }, [uploadPromise]);

  return (
    <div className="relative w-fit">
      <ImageComponent src={src} />
      {loading && (
        <div className="flex-center absolute inset-0 bg-neutral/70">
          <LoaderCircleIcon className="animate-spin" size={32} />
        </div>
      )}
    </div>
  );
}
