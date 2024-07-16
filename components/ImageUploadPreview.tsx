import { useState } from 'react';
import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';
import { LoaderCircleIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';

const imageUploadPreviewVariants = cva(
  'relative shrink-0 overflow-hidden rounded text-sm shadow',
  {
    variants: {
      size: {
        xs: 'size-24 rounded-sm text-xs',
        sm: 'size-32',
        md: 'size-48',
        lg: 'size-64',
        xl: 'size-80',
        full: 'size-full',
      },
    },
    defaultVariants: {
      size: 'full',
    },
  }
);

type ImageUploadPreviewProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof imageUploadPreviewVariants> & {
    src?: string;
    alt?: string;
    uploading?: boolean;
    removable?: boolean;
    onRemove?: () => void;
  };

export default function ImageUploadPreview({
  src,
  alt = '',
  size,
  uploading,
  removable,
  onRemove,
  className,
  ...props
}: ImageUploadPreviewProps) {
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  return (
    <div
      className={cn(imageUploadPreviewVariants({ size, className }))}
      {...props}
      onClick={() => {
        setObjectFit((prev) => (prev === 'cover' ? 'contain' : 'cover'));
      }}
    >
      {src ? (
        <>
          <Image
            className={cn('h-full w-full', {
              'object-cover': objectFit === 'cover',
              'object-contain': objectFit === 'contain',
            })}
            width={100}
            height={100}
            src={src}
            alt={alt}
          />
          {uploading && (
            <div className="flex-center absolute inset-0 bg-neutral/70">
              <LoaderCircleIcon className="animate-spin" size={32} />
            </div>
          )}
          {removable && (
            <button
              className="absolute right-1 top-1"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
            >
              <div className="flex size-4 items-center justify-center rounded-full bg-neutral shadow transition-all duration-300 hover:scale-110">
                <X className="text-neutral-content" width={12} height={12} />
              </div>
            </button>
          )}
        </>
      ) : (
        <div className="flex-center size-full rounded bg-base-content/10">
          No Image
        </div>
      )}
    </div>
  );
}
