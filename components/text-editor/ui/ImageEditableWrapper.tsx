import { IconButton } from '@/components/ui/IconButton';
import { cn, uploadImages } from '@/lib/utils';
import {
  Captions,
  CaptionsOff,
  ImagePlus,
  LoaderCircle,
  MoreVerticalIcon,
  Trash2,
} from 'lucide-react';
import { MAX_IMAGE_COUNT_PER_CAROUSEL } from '../constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

type ImageEditableWrapperProps = React.PropsWithChildren & {
  className?: string;
  indexLabel?: string;
  loading?: boolean;
  readonly?: boolean;
  imagesCount?: number;
  hasCaption?: boolean;
  onAddImages?: (images: File[]) => void;
  onRemove?: () => void;
  onToggleCaption?: (hasCaption: boolean) => void;
};

export function ImageEditableWrapper({
  className,
  children,
  indexLabel,
  loading,
  readonly,
  imagesCount = 1,
  hasCaption,
  onAddImages,
  onRemove,
  onToggleCaption,
}: ImageEditableWrapperProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {loading && (
        <div className="flex-center absolute inset-0 bg-neutral/70">
          <LoaderCircle className="animate-spin" size={32} />
        </div>
      )}
      {indexLabel && (
        <div
          className={
            'flex-center absolute right-2 top-2 h-[20px] min-w-[20px] select-none rounded-full bg-base-100/90 px-1 py-0.5 text-xs'
          }
        >
          {indexLabel}
        </div>
      )}
      {!readonly && (
        <div className="absolute bottom-0 right-0 flex p-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconButton
                size="xs"
                shape={'square'}
                className="bg-base-100/60 hover:bg-base-100/90"
              >
                <MoreVerticalIcon size={20} />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-18 min-w-0 rounded-sm border border-base-content/10 bg-base-100/70 text-xs text-primary-content shadow"
              side="top"
              sideOffset={2}
              align="end"
            >
              <DropdownMenuItem
                className={cn(
                  'flex select-none items-center justify-between gap-3 p-1.5 cursor-pointer',
                  {
                    'pointer-events-none opacity-40 cursor-default':
                      imagesCount >= MAX_IMAGE_COUNT_PER_CAROUSEL,
                  }
                )}
                onClick={() => {
                  uploadImages({
                    maxCount: MAX_IMAGE_COUNT_PER_CAROUSEL - imagesCount,
                    onUpload: (images) => onAddImages?.(images),
                  });
                }}
              >
                <ImagePlus size={14} />
                <div>추가</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer select-none items-center justify-between gap-3 p-1.5"
                onClick={() => onRemove?.()}
              >
                <Trash2 size={14} />
                <div>삭제</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer select-none items-center justify-between gap-3 p-1.5"
                onClick={() =>
                  setTimeout(() => onToggleCaption?.(!hasCaption), 100)
                }
              >
                {hasCaption ? (
                  <CaptionsOff size={14} />
                ) : (
                  <Captions size={14} />
                )}
                <div>캡션</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
