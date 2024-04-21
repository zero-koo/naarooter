import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_YOUTUBE_COMMAND } from './YouTubePlugin';
import { IconButton } from '@/components/ui/IconButton';
import { ImageIcon, YoutubeIcon } from 'lucide-react';
import YouTubeInputDialog from '../ui/YouTubeInsertModal';
import { useState } from 'react';

function ToolbarPlugin() {
  return (
    <div className="absolute bottom-0 left-0 z-10 flex w-full gap-1 border-y-2 border-base-content/40 bg-base-100 p-1 md:-right-1 md:bottom-auto md:left-auto md:top-0 md:w-auto md:translate-x-full md:flex-col md:border-t-4">
      <YouTubeInsertButton />
      <IconButton variant="ghost" size="sm">
        <ImageIcon />
      </IconButton>
      <IconButton variant="ghost" size="sm">
        <ImageIcon />
      </IconButton>
    </div>
  );
}

export default ToolbarPlugin;

function YouTubeInsertButton() {
  const [editor] = useLexicalComposerContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <YoutubeIcon />
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
