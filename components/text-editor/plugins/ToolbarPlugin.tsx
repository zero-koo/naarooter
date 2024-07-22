import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ImageIcon, ImagesIcon, YoutubeIcon } from 'lucide-react';

import { cn, uploadImages } from '@/lib/utils';
import GrayBox from '@/components/ui/GrayBox';
import { IconButton } from '@/components/ui/IconButton';

import YouTubeInputDialog from '../ui/YouTubeInsertModal';
import { INSERT_IMAGES_COMMAND } from './ImagesPlugin';
import { INSERT_YOUTUBE_COMMAND } from './YouTubePlugin';

export type ToolbarItem = 'Image' | 'Images' | 'Youtube';

function ToolbarPlugin({
  items,
  className,
}: {
  items?: ToolbarItem[];
  className?: string;
}) {
  return (
    <GrayBox className={cn('flex w-full gap-1 p-1 px-3', className)}>
      {(!items || items.includes('Image')) && <ImageInsertButton />}
      {(!items || items.includes('Images')) && <ImagesInsertButton />}
      {(!items || items.includes('Youtube')) && <YouTubeInsertButton />}
    </GrayBox>
  );
}

export default ToolbarPlugin;

function ImageInsertButton() {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <IconButton
        variant="ghost"
        size="sm"
        onClick={() => {
          uploadImages({
            maxCount: 10,
            onUpload: (images) => {
              images.forEach((image) =>
                editor.dispatchCommand(INSERT_IMAGES_COMMAND, [image])
              );
            },
          });
        }}
      >
        <ImageIcon strokeWidth={1.5} />
      </IconButton>
    </>
  );
}

function ImagesInsertButton() {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <IconButton
        variant="ghost"
        size="sm"
        onClick={() => {
          uploadImages({
            maxCount: 5,
            onUpload: (images) => {
              editor.dispatchCommand(INSERT_IMAGES_COMMAND, images);
            },
          });
        }}
      >
        <ImagesIcon strokeWidth={1.5} />
      </IconButton>
    </>
  );
}

function YouTubeInsertButton() {
  const [editor] = useLexicalComposerContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <YoutubeIcon strokeWidth={1.5} />
      </IconButton>
      {open && (
        <YouTubeInputDialog
          onSave={(link) => {
            editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, link);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
