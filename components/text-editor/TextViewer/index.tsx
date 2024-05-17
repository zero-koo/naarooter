import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useInitializeEditorComposerContext } from '../contexts/useInitializeEditorComposerContext';
import { ImagesNode } from '../nodes/ImagesNode';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { YouTubeNode } from '../nodes/YouTubeNode';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';

type TextEditorProps = {
  initialValue: string;
};

const defaultConfig: InitialConfigType = {
  namespace: 'read-only',
  nodes: [ImagesNode, YouTubeNode],
  onError(e) {
    console.error(e);
  },
};

const TextViewer = ({ initialValue }: TextEditorProps) => {
  const composerContext = useInitializeEditorComposerContext({
    ...defaultConfig,
    editorState: initialValue,
  });

  return (
    <LexicalComposerContext.Provider value={composerContext}>
      <div className={'relative mx-auto w-full'}>
        <PlainTextPlugin
          contentEditable={
            <div className="relative flex overflow-auto border-y border-b-2 border-t-4 border-base-content/40 bg-base-100 text-sm">
              <div className="-z-1 relative w-full flex-auto resize-y overflow-hidden">
                <ContentEditable
                  className="min-h-[350px] w-full overflow-hidden px-3 pb-14 pt-2 md:pb-2"
                  readOnly
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
