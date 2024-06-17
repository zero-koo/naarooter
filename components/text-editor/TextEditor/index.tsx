import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import YouTubePlugin from '../plugins/YouTubePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from '../contexts/SharedHistoryContext';
import DragDropPastePlugin from '../plugins/DragDropPastePlugin';
import ImagesPlugin from '../plugins/ImagesPlugin';
import { RootEditorContextProvider } from '../contexts/RootEditorContext';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useInitializeEditorComposerContext } from '../contexts/useInitializeEditorComposerContext';
import {
  ImagesNode,
  SerializedImagesNode,
  imageUploadPromiseCache,
} from '../nodes/ImagesNode';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { YouTubeNode } from '../nodes/YouTubeNode';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { getImageNodes } from '../utils';

type TextEditorProps = {
  initialConfig?: InitialConfigType;
  initialValues?: string;
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

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  ({ initialConfig, initialValues, onAddImage }, ref) => {
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

    useImperativeHandle(
      ref,
      () => {
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
      },
      [editor, waitForImagesUpload]
    );

    return (
      <RootEditorContextProvider onAddImage={onAddImage}>
        <LexicalComposerContext.Provider value={composerContext}>
          <SharedHistoryContext>
            <div
              className={
                'relative -mr-12 flex h-full flex-col overflow-auto pr-12'
              }
            >
              <HistoryPlugin externalHistoryState={historyState} />
              <DragDropPastePlugin />
              <RichTextPlugin
                contentEditable={
                  <div className="-z-1 relative w-full flex-1 overflow-auto text-sm">
                    <ContentEditable className="min-h-full w-full px-3 pb-14 pt-2 md:h-auto" />
                  </div>
                }
                placeholder={() => (
                  <div
                    className={
                      'Placeholder__root absolute px-3 pt-2 text-sm opacity-70'
                    }
                  >
                    가나다라마바사
                  </div>
                )}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <ImagesPlugin />
              <YouTubePlugin />
              <ToolbarPlugin />
            </div>
          </SharedHistoryContext>
        </LexicalComposerContext.Provider>
      </RootEditorContextProvider>
    );
  }
);

TextEditor.displayName = 'TextEditor';
export default TextEditor;
