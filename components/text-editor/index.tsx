'use client';

import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import {
  $getRoot,
  $parseSerializedNode,
  EditorState,
  SerializedEditorState,
} from 'lexical';

import { cn } from '@/lib/utils';

import style from './style.module.css';

interface TextEditorProps {
  initialContents?: SerializedEditorState;
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
  initialContents,
  onChange,
  placeholder,
  containerClass,
}: TextEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: 'TextEditor',
    theme,
    editorState() {
      if (!initialContents) return;
      const children = initialContents.root.children.map($parseSerializedNode);
      const root = $getRoot();
      root.append(...children);
    },
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          style.container,
          'textarea relative overflow-auto rounded-none p-0',
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
