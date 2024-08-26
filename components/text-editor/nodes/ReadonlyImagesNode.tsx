import React from 'react';
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

import { cn } from '@/lib/utils';

import { ImagesBlock } from '../ui/ImagesBlock';

export type SerializedReadonlyImagesNode = Spread<
  {
    images: Array<ImageItem>;
    caption: string;
    index: number | null;
  },
  SerializedDecoratorBlockNode
>;

export type ImageItem = {
  srcURL: string;
};

export class ReadonlyImagesNode extends DecoratorBlockNode {
  __images: Array<ImageItem>;
  __index: number | null;
  __caption: string;

  static getType(): string {
    return 'images';
  }

  static clone(node: ReadonlyImagesNode): ReadonlyImagesNode {
    return new ReadonlyImagesNode(
      {
        images: [...node.__images],
        caption: node.__caption,
        index: node.__index,
      },
      node.__format,
      node.__key
    );
  }

  static importJSON(
    serializedNode: SerializedReadonlyImagesNode
  ): ReadonlyImagesNode {
    const node = $createImagesNode(serializedNode);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedReadonlyImagesNode {
    return {
      ...super.exportJSON(),
      type: 'images',
      version: 1,
      images: [...this.__images],
      caption: this.__caption,
      index: this.__index,
    };
  }

  constructor(
    {
      images,
      index,
      caption,
    }: {
      images: Array<ImageItem>;
      index: number | null;
      caption: string;
    },
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__images = images;
    this.__caption = caption;
    this.__index = index;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImagesNodeReadonlyBlock
        images={this.__images}
        index={this.__index}
        caption={this.__caption}
      />
    );
  }
}

export function $createImagesNode({
  images,
  index,
  caption,
}: {
  images: Array<ImageItem>;
  index: number | null;
  caption: string;
}): ReadonlyImagesNode {
  return new ReadonlyImagesNode({ images, caption, index });
}

export function $isImagesNode(
  node: ReadonlyImagesNode | LexicalNode | null | undefined
): node is ReadonlyImagesNode {
  return node instanceof ReadonlyImagesNode;
}

export const ImagesNodeReadonlyBlock = (props: {
  images: Array<ImageItem>;
  index: number | null;
  caption: string;
}) => <ImagesBlock {...props} readonly hasCaption={!!props.caption.trim()} />;
