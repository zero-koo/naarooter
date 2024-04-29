import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { useState } from 'react';

const imageSquareViewVariants = cva(
  'relative shrink-0 overflow-hidden rounded text-sm',
  {
    variants: {
      size: {
        xs: 'h-24 w-24 rounded-sm text-xs',
        sm: 'h-32 w-32',
        md: 'h-48 w-48',
        lg: 'h-64 w-64',
        xl: 'h-80 w-80',
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
    removable?: boolean;
    onRemove?: () => void;
  };

export default function ImageSquareView({
  src,
  alt = '',
  size,
  className,
  ...props
}: ImageSquareViewProps) {
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  return (
    <div
      className={cn(imageSquareViewVariants({ size, className }))}
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
        </>
      ) : (
        <div className="flex-center h-full w-full rounded bg-base-content/10">
          No Image
        </div>
      )}
    </div>
  );
}
