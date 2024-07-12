import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { LoaderCircleIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const imageUploadPreviewVariants = cva(
  'relative shrink-0 overflow-hidden rounded text-sm shadow',
  {
    variants: {
      size: {
        xs: 'h-24 w-24 rounded-sm text-xs',
        sm: 'h-32 w-32',
        md: 'h-48 w-48',
        lg: 'h-64 w-64',
        xl: 'h-80 w-80',
        full: 'h-full w-full',
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
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral shadow transition-all duration-300 hover:scale-110">
                <X className="text-neutral-content" width={12} height={12} />
              </div>
            </button>
          )}
        </>
      ) : (
        <div className="flex-center h-full w-full rounded bg-base-content/10">
          No Image
        </div>
      )}
    </div>
  );
}
