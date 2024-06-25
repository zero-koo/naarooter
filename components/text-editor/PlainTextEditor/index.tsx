import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { SharedHistoryContext } from '../contexts/SharedHistoryContext';
import { forwardRef, useImperativeHandle } from 'react';
import { useInitializeEditorComposerContext } from '../contexts/useInitializeEditorComposerContext';

import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { cn } from '@/lib/utils';

type TextEditorProps = {
  className?: string;
  initialConfig?: InitialConfigType;
  initialValues?: string;
  placeholder?: string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
};

const defaultInitialConfig: InitialConfigType = {
  namespace: 'plain-text-editor',
  onError(e) {
    console.error(e);
  },
};

export type TextEditorHandle = {
  getSerializedState(): Promise<string>;
};

const PlainTextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  (
    { className, initialConfig, initialValues, placeholder, onInput, onChange },
    ref
  ) => {
    const editorConfig = initialConfig ?? defaultInitialConfig;

    const composerContext = useInitializeEditorComposerContext({
      ...editorConfig,
      editorState: initialValues,
    });
    const [editor] = composerContext;

    useImperativeHandle(
      ref,
      () => {
        return {
          async getSerializedState() {
            const serialized = editor._editorState.toJSON();
            return JSON.stringify(serialized);
          },
        };
      },
      [editor]
    );

    return (
      <LexicalComposerContext.Provider value={composerContext}>
        <SharedHistoryContext>
          <div
            className={cn(
              className,
              'relative flex h-full flex-col overflow-auto'
            )}
          >
            <PlainTextPlugin
              contentEditable={
                <div className="-z-1 relative w-full flex-1 overflow-auto text-sm">
                  <ContentEditable
                    className="min-h-[150px] w-full px-2 pb-14 pt-2 md:h-auto"
                    onInput={() => {
                      onInput?.(JSON.stringify(editor._editorState.toJSON()));
                    }}
                    onBlur={() => {
                      onChange?.(JSON.stringify(editor._editorState.toJSON()));
                    }}
                  />
                </div>
              }
              placeholder={() => (
                <div
                  className={
                    'Placeholder__root pointer-events-none absolute px-2 pt-2 text-sm text-base-content/50'
                  }
                >
                  {placeholder ?? '가나다라마바사'}
                </div>
              )}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </SharedHistoryContext>
      </LexicalComposerContext.Provider>
    );
  }
);

PlainTextEditor.displayName = 'PlainTextEditor';

export default PlainTextEditor;
