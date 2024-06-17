import { INSERT_YOUTUBE_COMMAND } from './YouTubePlugin';
import { IconButton } from '@/components/ui/IconButton';
import { ImageIcon, ImagesIcon, YoutubeIcon } from 'lucide-react';
import YouTubeInputDialog from '../ui/YouTubeInsertModal';
import { useState } from 'react';
import { INSERT_IMAGES_COMMAND } from './ImagesPlugin';
import { cn, uploadImages } from '@/lib/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function ToolbarPlugin({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex w-full gap-1 border-t-4 border-base-content/40 p-1 md:absolute md:right-11 md:top-0 md:w-auto md:translate-x-full md:flex-col md:border-b-4 md:px-0',
        className
      )}
    >
      <ImageInsertButton />
      <ImagesInsertButton />
      <YouTubeInsertButton />
    </div>
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
