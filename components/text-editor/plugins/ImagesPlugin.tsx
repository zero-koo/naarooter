import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';

import { $createImagesNode, ImagesNode } from '../nodes/ImagesNode';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { useRootEditorContext } from '../contexts/RootEditorContext';
import { getImageNodes } from '../utils';

export const INSERT_IMAGES_COMMAND: LexicalCommand<File[]> = createCommand(
  'INSERT_IMAGES_COMMAND'
);

export default function ImagesPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const { onAddImage } = useRootEditorContext();

  useEffect(() => {
    if (!editor.hasNodes([ImagesNode])) {
      throw new Error('ImagesPlugin: ImagesNode not registered on editor');
    }

    editor.registerMutationListener(ImagesNode, () => {
      editor.update(() => {
        const imageNodes = getImageNodes(editor._editorState);
        imageNodes.forEach((node, index) => {
          if (node.__index !== index) node.setIndex(index);
        });
      });
    });

    return editor.registerCommand<File[]>(
      INSERT_IMAGES_COMMAND,
      (images) => {
        const imagesWithUrl = images.map((image) => ({
          blobURL: URL.createObjectURL(image),
          image,
        }));

        const imageNode = $createImagesNode({
          images: imagesWithUrl.map(({ blobURL, image }) => ({
            blobURL,
            uploadPromise: onAddImage?.({ image }),
          })),
          caption: '',
          index: null,
        });
        $insertNodeToNearestRoot(imageNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, onAddImage]);

  return null;
}
