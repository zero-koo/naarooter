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
import { ImagesNode } from '../nodes/ImagesNode';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
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
  getSerializedState(): SerializedEditorState<SerializedLexicalNode>;
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
          getSerializedState() {
            return editor._editorState.toJSON();
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
            <div className={'relative mx-auto w-full'}>
              <HistoryPlugin externalHistoryState={historyState} />
              <DragDropPastePlugin />
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={
                  <div className="relative flex overflow-auto border-y border-b-2 border-t-4 border-base-content/40 bg-base-100 text-sm">
                    <div className="-z-1 relative w-full flex-auto resize-y overflow-hidden">
                      <ContentEditable className="min-h-[350px] w-full overflow-hidden px-3 pb-14 pt-2 md:pb-2" />
                    </div>
                  </div>
                }
                placeholder={(children: React.ReactNode) => (
                  <div className={'Placeholder__root'}>{children}</div>
                )}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <ImagesPlugin />
              <YouTubePlugin />
            </div>
          </SharedHistoryContext>
        </LexicalComposerContext.Provider>
      </RootEditorContextProvider>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
