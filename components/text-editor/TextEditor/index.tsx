import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { RootEditorContextProvider } from '../contexts/RootEditorContext';
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from '../contexts/SharedHistoryContext';
import { useInitializeEditorComposerContext } from '../contexts/useInitializeEditorComposerContext';
import {
  ImagesNode,
  imageUploadPromiseCache,
  SerializedImagesNode,
} from '../nodes/ImagesNode';
import { YouTubeNode } from '../nodes/YouTubeNode';
import DragDropPastePlugin from '../plugins/DragDropPastePlugin';
import ImagesPlugin from '../plugins/ImagesPlugin';
import ToolbarPlugin, { ToolbarItem } from '../plugins/ToolbarPlugin';
import YouTubePlugin from '../plugins/YouTubePlugin';
import { getImageNodes } from '../utils';

type TextEditorProps = {
  initialConfig?: InitialConfigType;
  initialValues?: string;
  toolbarItems?: ToolbarItem[];
  maxContentNode?: number;
  disableDragDrop?: boolean;
  onAddImage?: ({ image }: { image: File }) => Promise<string>;
};

const defaultInitialConfig: InitialConfigType = {
  namespace: 'text-editor',
  nodes: [ImagesNode, YouTubeNode],
  onError(e) {
    console.error(e);
  },
};

export type TextEditorHandle = {
  getSerializedState(): Promise<string>;
  getThumbnailImageURL(): Promise<string | undefined>;
  waitForImagesUpload(): Promise<void>;
};

// TODO: Develop maxContentNode
const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  (
    { initialConfig, initialValues, toolbarItems, disableDragDrop, onAddImage },
    ref
  ) => {
    const { historyState } = useSharedHistoryContext();

    const editorConfig = initialConfig ?? defaultInitialConfig;

    const composerContext = useInitializeEditorComposerContext({
      ...editorConfig,
      editorState: initialValues,
    });
    const [editor] = composerContext;

    const waitForImagesUpload = useCallback(async () => {
      await Promise.all(
        getImageNodes(editor._editorState).map((node) =>
          Promise.all(node.__images.map((image) => image.uploadPromise))
        )
      );
    }, [editor]);

    useImperativeHandle(ref, () => {
      return {
        async getSerializedState() {
          const serialized = editor._editorState.toJSON();

          Object.assign(serialized.root, {
            children: await Promise.all(
              serialized.root.children.map(async (child) => {
                if (child.type !== 'images') return child;

                return {
                  ...child,
                  images: await Promise.all(
                    (child as SerializedImagesNode).images.map(
                      async (image) => ({
                        blobURL: undefined,
                        srcURL: await (image.srcURL ??
                          (image.blobURL
                            ? imageUploadPromiseCache.get(image.blobURL)
                            : undefined)),
                      })
                    )
                  ),
                };
              })
            ),
          });

          return JSON.stringify(serialized);
        },
        async getThumbnailImageURL() {
          await waitForImagesUpload();
          const firstImage = getImageNodes(editor._editorState)
            .at(0)
            ?.__images.at(0);

          return firstImage?.srcURL ?? firstImage?.uploadPromise;
        },
        waitForImagesUpload,
      };
    }, [editor, waitForImagesUpload]);

    return (
      <LexicalComposerContext.Provider value={composerContext}>
        <RootEditorContextProvider onAddImage={onAddImage}>
          <SharedHistoryContext>
            <div className={'relative flex h-full flex-col overflow-auto'}>
              <HistoryPlugin externalHistoryState={historyState} />
              {!disableDragDrop && <DragDropPastePlugin />}
              <RichTextPlugin
                contentEditable={
                  <div className="relative w-full flex-1 overflow-auto text-sm">
                    <ContentEditable className="min-h-full w-full px-3 py-2 md:h-auto" />
                  </div>
                }
                placeholder={() => (
                  <div
                    className={
                      'Placeholder__root text-foreground/50 absolute px-3 pt-2 text-sm'
                    }
                  >
                    가나다라마바사
                  </div>
                )}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <ImagesPlugin />
              <YouTubePlugin />
              <ToolbarPlugin items={toolbarItems} />
            </div>
          </SharedHistoryContext>
        </RootEditorContextProvider>
      </LexicalComposerContext.Provider>
    );
  }
);

TextEditor.displayName = 'TextEditor';
export default TextEditor;
