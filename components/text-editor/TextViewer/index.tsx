import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useInitializeEditorComposerContext } from '../contexts/useInitializeEditorComposerContext';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { YouTubeNode } from '../nodes/YouTubeNode';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ReadonlyImagesNode } from '../nodes/ReadonlyImagesNode';
import { useCallback } from 'react';

type TextEditorProps = {
  initialValue: string;
};

const defaultConfig: InitialConfigType = {
  namespace: 'read-only',
  nodes: [ReadonlyImagesNode, YouTubeNode],
  onError(e) {
    console.error(e);
  },
};

const TextViewer = ({ initialValue }: TextEditorProps) => {
  const composerContext = useInitializeEditorComposerContext({
    ...defaultConfig,
    editorState: initialValue,
  });

  const [editor] = composerContext;

  const ref = useCallback(
    (rootElement: HTMLElement | null) => {
      if (rootElement) {
        editor.setRootElement(rootElement);
      }
    },
    [editor]
  );

  return (
    <LexicalComposerContext.Provider value={composerContext}>
      <div className={'relative mx-auto w-full'}>
        <PlainTextPlugin
          contentEditable={
            <div className="relative flex overflow-auto border-y border-base-content/60 text-sm">
              <div className="-z-1 relative w-full flex-auto resize-y overflow-hidden">
                <div
                  ref={ref}
                  className="min-h-[350px] w-full overflow-hidden px-3 pb-14 pt-2 md:pb-2"
                />
              </div>
            </div>
          }
          placeholder={(children: React.ReactNode) => (
            <div className={'Placeholder__root'}>{children}</div>
          )}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposerContext.Provider>
  );
};

TextViewer.displayName = 'TextViewer';
export default TextViewer;
