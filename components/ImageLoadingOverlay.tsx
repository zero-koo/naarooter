import { LoaderCircleIcon } from 'lucide-react';

export const ImageLoadingOverlay = () => {
  return (
    <div className="flex-center bg-neutral/70 absolute inset-0">
      <LoaderCircleIcon className="animate-spin" size={32} />
    </div>
  );
};
