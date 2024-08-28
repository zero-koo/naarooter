import React from 'react';
import {
  SerializedElementNode,
  SerializedRootNode,
  SerializedTextNode,
  Spread,
} from 'lexical';

import { SerializedReadonlyImagesNode } from '../nodes/ReadonlyImagesNode';
import { SerializedYouTubeNode } from '../nodes/YouTubeNode';
import { ImagesBlock } from '../ui/ImagesBlock';
import YoutubeEmbed from '../ui/YoutubeEmbed';

type TextEditorProps = {
  value: string | undefined;
};

const TextViewer = ({ value }: TextEditorProps) => {
  const parsedState = value && JSON.parse(value);

  return (
    <div className={'relative mx-auto w-full'}>
      <div className="relative flex overflow-auto border-base-content/60 text-sm">
        <div className="-z-1 relative w-full flex-auto overflow-hidden">
          <div className="w-full overflow-hidden px-3 py-2 pt-3">
            {parsedState ? nodeToJSX(parsedState.root) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

TextViewer.displayName = 'TextViewer';
export default TextViewer;

export type TagType =
  | keyof JSX.IntrinsicElements
  | React.FC<{
      children?: React.ReactNode | undefined;
    }>;

function getTagNode(node: SerializedEditorNode): TagType {
  switch (node.type) {
    case 'paragraph':
      return 'p';
    default:
      return React.Fragment;
  }
}

// TODO!
// Refactor node types
type SerializedEditorChildNode =
  | (SerializedTextNode & { type: 'text' })
  | (SerializedParagraphNode & { type: 'paragraph' })
  | (SerializedReadonlyImagesNode & { type: 'images' })
  | (SerializedYouTubeNode & { type: 'youtube' });

type RootNode = SerializedRootNode<SerializedEditorChildNode> & {
  type: 'root';
};

type SerializedEditorNode = RootNode | SerializedEditorChildNode;

type SerializedParagraphNode = Spread<
  {
    textFormat: number;
  },
  SerializedElementNode<SerializedTextNode & { type: 'text' }>
>;

function nodeToJSX(node: SerializedEditorNode, key?: string | number) {
  const Tag = getTagNode(node);

  const children = (() => {
    switch (node.type) {
      case 'text': {
        return node.text;
      }
      case 'paragraph': {
        return !node.children?.length ? <br /> : node.children?.map(nodeToJSX);
      }
      case 'images': {
        return (
          <ImagesBlock
            readonly
            images={node.images}
            index={node.index}
            caption={node.caption}
            hasCaption={!!node.caption.trim()}
          />
        );
      }
      case 'youtube': {
        return (
          <YoutubeEmbed className="aspect-video w-full" link={node.link} />
        );
      }
      default: {
        return node.children?.map(nodeToJSX);
      }
    }
  })();

  return <Tag key={key}>{children}</Tag>;
}
