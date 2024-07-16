import { useState } from 'react';
import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const imageSquareViewVariants = cva(
  'relative max-h-[320px] max-w-[320px] shrink-0 overflow-hidden rounded text-sm',
  {
    variants: {
      size: {
        xs: 'size-24 rounded-sm text-xs',
        sm: 'size-32',
        md: 'size-48',
        lg: 'size-64',
        xl: 'size-80',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type ImageSquareViewProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof imageSquareViewVariants> & {
    src?: string;
    alt?: string;
    loading?: boolean;
    customSize?: number;
    removable?: boolean;
    onRemove?: () => void;
  };

export default function ImageSquareView({
  src,
  alt = '',
  size,
  customSize,
  className,
  ...props
}: ImageSquareViewProps) {
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  return (
    <div
      className={cn(
        'bg-base-content/10',
        imageSquareViewVariants({ size, className })
      )}
      style={
        customSize
          ? { width: `${customSize}px`, height: `${customSize}px` }
          : undefined
      }
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
            fill
            src={src}
            alt={alt}
          />
        </>
      ) : (
        <div className="flex-center size-full rounded bg-base-content/10">
          No Image
        </div>
      )}
    </div>
  );
}
