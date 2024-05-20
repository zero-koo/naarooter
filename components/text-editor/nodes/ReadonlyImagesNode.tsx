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
import { ImageCarousel } from '../ui/ImageCarousel';
import { cn } from '@/lib/utils';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import React from 'react';
import { ImageEditableWrapper } from '../ui/ImageEditableWrapper';
import Image from 'next/image';

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

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: cn('my-1 -mx-1', embedBlockTheme.base || ''),
      focus: embedBlockTheme.focus || '',
    };

    return (
      <ImagesNodeComponent
        className={className}
        images={this.__images}
        index={this.__index}
        caption={this.__caption}
        format={this.__format}
        nodeKey={this.getKey()}
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

function ImagesNodeComponent({
  images,
  index,
  caption,
  className,
  format,
  nodeKey,
}: {
  images: Array<ImageItem>;
  index: number | null;
  caption: string;
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
}) {
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      {images.length > 1 ? (
        <ImageCarousel
          images={images.map((image) => ({
            src: image.srcURL,
          }))}
          index={index}
          hasCaption={!!caption}
          readonly
        />
      ) : (
        <SingleImageComponent
          src={images[0].srcURL}
          index={index}
          hasCaption={!!caption}
        />
      )}
      {caption && (
        <>
          <div className="min-h-6 absolute inset-x-0 flex items-center overflow-hidden text-ellipsis px-2 text-xs font-semibold">
            {caption}
          </div>
          <div className="h-6 w-full"></div>
        </>
      )}
    </BlockWithAlignableContents>
  );
}

function SingleImageComponent({
  src,
  index,
  hasCaption,
}: {
  src: string;
  index: number | null;
  hasCaption: boolean;
}) {
  return (
    <ImageEditableWrapper
      indexLabel={index !== null ? `${index + 1}` : undefined}
      hasCaption={hasCaption}
      readonly
    >
      <Image
        src={src}
        alt={'Image'}
        className="w-full"
        width={500}
        height={500}
      />
    </ImageEditableWrapper>
  );
}
