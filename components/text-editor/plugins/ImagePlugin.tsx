import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';

import { $createImageNode, ImageNode } from '../nodes/ImageNode';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { useRootEditorContext } from '../contexts/RootEditorContext';
import { $getImageNodes } from '../utils';

export const INSERT_IMAGE_COMMAND: LexicalCommand<File> = createCommand(
  'INSERT_IMAGE_COMMAND'
);

export default function ImagePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const { onAddImage } = useRootEditorContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagePlugin: ImageNode not registered on editor');
    }

    editor.registerMutationListener(ImageNode, () => {
      editor.update(() => {
        const imageNodes = $getImageNodes();
        imageNodes.forEach((node, index) => {
          if (node.__index !== index) node.setIndex(index);
        });
      });
    });

    return editor.registerCommand<File>(
      INSERT_IMAGE_COMMAND,
      (image) => {
        const imageNode = $createImageNode({ src: image });
        $insertNodeToNearestRoot(imageNode);

        const srcPromise = onAddImage(image);
        imageNode.startUpload(srcPromise);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, onAddImage]);

  return null;
}
