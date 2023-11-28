'use client';

import { EditorState } from 'lexical';

import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import style from './style.module.css';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  intialState?: EditorState;
  onChange?: (editorState: EditorState) => void;
  placeholder?: string;
  containerClass?: string;
}

const theme: InitialConfigType['theme'] = {
  // Theme styling goes here
  // ...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export function TextEditor({
  intialState,
  onChange,
  placeholder,
  containerClass,
}: TextEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: 'TextEditor',
    theme,
    editorState: intialState ?? null,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          style.container,
          'textarea relative overflow-auto p-0 rounded-none',
          containerClass
        )}
      >
        <PlainTextPlugin
          contentEditable={<ContentEditable className={style.input} />}
          placeholder={
            <div className={style.placeholder}>
              {placeholder ?? 'Enter some text...'}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          onChange={(editorState) => {
            onChange?.(editorState);
          }}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}
