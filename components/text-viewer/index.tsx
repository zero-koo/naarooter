'use client';

import { $getRoot, $parseSerializedNode, SerializedEditorState } from 'lexical';

import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { cn } from '@/lib/utils';

interface TextEditorProps {
  content: SerializedEditorState;
  containerClass?: string;
}

const theme: InitialConfigType['theme'] = {};

function onError(error: any) {
  console.error(error);
}

export function TextViewer({ content, containerClass }: TextEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: 'TextEditor',
    theme,
    editable: false,
    editorState() {
      const children = content.root.children.map($parseSerializedNode);
      const root = $getRoot();
      root.append(...children);
    },
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn('relative p-0 rounded-none flex-1', containerClass)}>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
}
