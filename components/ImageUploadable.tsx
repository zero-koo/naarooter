import { useEffect, useState } from 'react';
import { useRootEditorContext } from './text-editor/contexts/RootEditorContext';
import { LoaderCircleIcon } from 'lucide-react';

const imageUploadPromiseMap = new Map<string, Promise<string>>();

export function ImageUploadable({
  src,
  ImageComponent,
}: {
  src: string;
  ImageComponent: React.FC<{ src: string }>;
}) {
  const { onAddImage } = useRootEditorContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUploadPromiseMap.has(src)) {
      imageUploadPromiseMap.set(src, onAddImage(src));
    }
    imageUploadPromiseMap.get(src)!.then(() => {
      setLoading(false);
    });
  }, []);

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
