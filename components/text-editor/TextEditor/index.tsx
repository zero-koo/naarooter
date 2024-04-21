import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import YouTubePlugin from '../plugins/YouTubePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { YouTubeNode } from '../nodes/YouTubeNode';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from '../contexts/SharedHistoryContext';

const defaultInitialConfig: InitialConfigType = {
  namespace: 'text-editor',
  nodes: [YouTubeNode],
  onError(e) {
    console.error(e);
  },
};

export default function TextEditor() {
  const { historyState } = useSharedHistoryContext();

  return (
    <LexicalComposer initialConfig={defaultInitialConfig}>
      <SharedHistoryContext>
        <div className={'relative mx-auto my-5 w-full max-w-xl'}>
          <HistoryPlugin externalHistoryState={historyState} />
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <div className="relative flex overflow-auto border-y border-b-2 border-t-4 border-base-content/40 bg-base-100">
                <div className="-z-1 relative flex-auto resize-y">
                  <ContentEditable className="min-h-[350px] px-3 pb-14 pt-2 md:pb-2" />
                </div>
              </div>
            }
            placeholder={(children: React.ReactNode) => (
              <div className={'Placeholder__root'}>{children}</div>
            )}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <YouTubePlugin />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
