import {
  InitialConfigType,
  InitialEditorStateType,
} from '@lexical/react/LexicalComposer';
import {
  LexicalComposerContextType,
  createLexicalComposerContext,
} from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  LexicalEditor,
  createEditor,
} from 'lexical';
import { useLayoutEffect, useMemo } from 'react';

export const useInitializeEditorComposerContext = (
  initialConfig: InitialConfigType
) => {
  const composerContext: [LexicalEditor, LexicalComposerContextType] = useMemo(
    () => {
      const {
        theme,
        namespace,
        nodes,
        onError,
        editorState: initialEditorState,
        html,
      } = initialConfig;

      const context: LexicalComposerContextType = createLexicalComposerContext(
        null,
        {}
      );
      const editor: LexicalEditor = createEditor({
        html,
        namespace,
        nodes,
        onError: (error) => onError(error, editor),
        theme,
      });

      initializeEditor(editor, initialEditorState);

      return [editor, context];
    },

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    const isEditable = initialConfig.editable;
    const [editor] = composerContext;
    editor.setEditable(isEditable !== undefined ? isEditable : true);

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return composerContext;
};

const HISTORY_MERGE_OPTIONS = { tag: 'history-merge' };

function initializeEditor(
  editor: LexicalEditor,
  initialEditorState?: InitialEditorStateType
): void {
  if (initialEditorState === null) {
    return;
  } else if (initialEditorState === undefined) {
    editor.update(() => {
      const root = $getRoot();
      if (root.isEmpty()) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        const activeElement = document.activeElement;
        if (
          $getSelection() !== null ||
          (activeElement !== null && activeElement === editor.getRootElement())
        ) {
          paragraph.select();
        }
      }
    }, HISTORY_MERGE_OPTIONS);
  } else if (initialEditorState !== null) {
    switch (typeof initialEditorState) {
      case 'string': {
        const parsedEditorState = editor.parseEditorState(initialEditorState);
        editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case 'object': {
        editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case 'function': {
        editor.update(() => {
          const root = $getRoot();
          if (root.isEmpty()) {
            initialEditorState(editor);
          }
        }, HISTORY_MERGE_OPTIONS);
        break;
      }
    }
  }
}
