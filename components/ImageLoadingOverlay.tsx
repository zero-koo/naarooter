import { LoaderCircleIcon } from 'lucide-react';

export const ImageLoadingOverlay = () => {
  return (
    <div className="flex-center absolute inset-0 bg-neutral/70">
      <LoaderCircleIcon className="animate-spin" size={32} />
    </div>
  );
};
