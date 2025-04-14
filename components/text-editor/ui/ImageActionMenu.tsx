import {
  Captions,
  CaptionsOff,
  ImagePlus,
  MoreVerticalIcon,
  Trash2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconButton } from '@/components/ui/IconButton';

import { MAX_IMAGE_COUNT_PER_CAROUSEL } from '../constants';
import { useImageActionMenuContext } from '../contexts/ImageActionMenuContext';

const ImageActionMenu = ({ subIndex = 0 }: { subIndex?: number }) => {
  const { imageCount, hasCaption, onClickAdd, onClickRemove, onClickCaption } =
    useImageActionMenuContext();

  return (
    <div className="absolute bottom-0 right-0 flex p-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            size="xs"
            shape={'square'}
            className="bg-base-100/60 text-foreground/80 hover:bg-base-100/90"
          >
            <MoreVerticalIcon size={20} />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-18 border-foreground/10 bg-base-100/70 text-foreground min-w-0 rounded-sm border text-xs shadow"
          side="top"
          sideOffset={2}
          align="end"
        >
          <DropdownMenuItem
            className={cn(
              'flex cursor-pointer select-none items-center justify-between gap-3 p-1.5',
              {
                'pointer-events-none cursor-default opacity-40':
                  imageCount >= MAX_IMAGE_COUNT_PER_CAROUSEL,
              }
            )}
            onClick={() => onClickAdd(subIndex)}
          >
            <ImagePlus size={14} />
            <div>추가</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer select-none items-center justify-between gap-3 p-1.5"
            onClick={() => onClickRemove(subIndex)}
          >
            <Trash2 size={14} />
            <div>삭제</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer select-none items-center justify-between gap-3 p-1.5"
            onClick={() => setTimeout(() => onClickCaption(), 100)}
          >
            {hasCaption ? <CaptionsOff size={14} /> : <Captions size={14} />}
            <div>캡션</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ImageActionMenu;
