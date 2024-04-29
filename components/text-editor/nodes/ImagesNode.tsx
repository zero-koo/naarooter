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
import React, { useLayoutEffect, useRef, useState } from 'react';
import { ImageEditableWrapper } from '../ui/ImageEditableWrapper';
import { ImageUploadable } from '@/components/ImageUploadable';
import Image from 'next/image';

export type SerializedImagesNode = Spread<
  {
    images: Array<ImageItem>;
    caption: string;
    index: number | null;
  },
  SerializedDecoratorBlockNode
>;

type ImageItem = {
  src: string;
};

type ImageConstructorItem = {
  src: File | string;
};

export class ImagesNode extends DecoratorBlockNode {
  __images: Array<ImageItem>;
  __index: number | null;
  __caption: string;

  static getType(): string {
    return 'images';
  }

  static clone(node: ImagesNode): ImagesNode {
    return new ImagesNode(
      {
        images: node.__images,
        caption: node.__caption,
        index: node.__index,
      },
      node.__format,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImagesNode): ImagesNode {
    const node = $createImagesNode(serializedNode);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedImagesNode {
    return {
      ...super.exportJSON(),
      type: 'images',
      version: 1,
      images: this.__images,
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
      images: Array<ImageConstructorItem>;
      index: number | null;
      caption: string;
    },
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__images = images.map(({ src }) => ({
      src: typeof src === 'string' ? src : URL.createObjectURL(src),
    }));
    this.__caption = caption;
    this.__index = index;
  }

  updateDOM(): false {
    return false;
  }

  setIndex(index: number) {
    const writable = this.getWritable();
    writable.__index = index;
  }

  addItems(images: Array<File | string>, at: number) {
    const writable = this.getWritable();
    writable.__images = [
      ...this.__images.slice(0, at + 1),
      ...images.slice(0, 5 - this.__images.length).map((image) => ({
        src: typeof image === 'string' ? image : URL.createObjectURL(image),
      })),
      ...this.__images.slice(at + 1),
    ];
  }

  removeItem(subIndex: number) {
    const writable = this.getWritable();
    writable.__images = this.__images.filter((_, i) => i !== subIndex);
  }

  setCaption(caption: string) {
    const writable = this.getWritable();
    writable.__caption = caption;
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
        onAddImages={(images, at) => {
          editor.update(() => {
            this.addItems(images, at);
          });
        }}
        onRemoveItem={(subIndex) => {
          editor.update(() => {
            if (this.__images.length > 1) {
              this.removeItem(subIndex);
            } else {
              this.remove();
            }
          });
        }}
        onChangeCaption={(caption) => {
          editor.update(() => {
            this.setCaption(caption);
          });
        }}
      />
    );
  }
}

export function $createImagesNode({
  images,
  index,
  caption,
}: {
  images: Array<ImageConstructorItem>;
  index: number | null;
  caption: string;
}): ImagesNode {
  return new ImagesNode({ images, caption, index });
}

export function $isImagesNode(
  node: ImagesNode | LexicalNode | null | undefined
): node is ImagesNode {
  return node instanceof ImagesNode;
}

function ImagesNodeComponent({
  images,
  index,
  caption,
  className,
  format,
  nodeKey,
  onAddImages,
  onRemoveItem,
  onChangeCaption,
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
  onAddImages: (images: File[], at: number) => void;
  onRemoveItem: (subIndex: number) => void;
  onChangeCaption: (caption: string) => void;
}) {
  const [hasCaption, setHasCaption] = useState(!!caption?.trim());
  const [captionValue, setCaptionValue] = useState(caption);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      {images.length > 1 ? (
        <ImageCarousel
          images={images}
          index={index}
          hasCaption={hasCaption}
          onAddImages={(images: File[], at: number) => {
            onAddImages(images, at);
          }}
          onRemove={onRemoveItem}
          onToggleCaption={(hasCaption) => {
            if (hasCaption) {
              setHasCaption(true);
              onChangeCaption?.(captionValue);
              setIsEditMode(true);
            } else {
              setHasCaption(false);
              onChangeCaption?.('');
              setIsEditMode(false);
            }
          }}
        />
      ) : (
        <SingleImageComponent
          src={images[0].src}
          index={index}
          hasCaption={hasCaption}
          onAddImages={(images) => onAddImages(images, 0)}
          onToggleCaption={(hasCaption) => {
            if (hasCaption) {
              setHasCaption(true);
              onChangeCaption?.(captionValue);
              setIsEditMode(true);
            } else {
              setHasCaption(false);
              onChangeCaption?.('');
              setIsEditMode(false);
            }
          }}
          onRemove={() => onRemoveItem(0)}
        />
      )}
      {hasCaption &&
        (isEditMode ? (
          <CaptionInput
            value={captionValue}
            onBlur={(caption) => {
              setCaptionValue(caption);
              onChangeCaption?.(caption);
              setIsEditMode(false);
            }}
          />
        ) : (
          <>
            <div
              className="flex-center min-h-6 absolute inset-x-0 overflow-hidden text-ellipsis text-center text-xs font-semibold"
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              {captionValue}
            </div>
            <div className="h-6 w-full"></div>
          </>
        ))}
    </BlockWithAlignableContents>
  );
}

function SingleImageComponent({
  src,
  index,
  hasCaption,
  readonly,
  onToggleCaption,
  onAddImages,
  onRemove,
}: {
  src: string;
  index: number | null;
  hasCaption: boolean;
  readonly?: boolean;
  onAddImages: (images: File[]) => void;
  onToggleCaption?: (hasCaption: boolean) => void;
  onRemove?: () => void;
}) {
  return (
    <ImageEditableWrapper
      indexLabel={index !== null ? `${index + 1}` : undefined}
      hasCaption={hasCaption}
      readonly={readonly}
      onAddImages={onAddImages}
      onToggleCaption={onToggleCaption}
      onRemove={() => onRemove?.()}
    >
      <ImageUploadable
        src={src}
        ImageComponent={({ src }) => (
          <Image
            src={src}
            alt={'Image'}
            className="w-full"
            width={0}
            height={0}
          />
        )}
      />
    </ImageEditableWrapper>
  );
}

function CaptionInput({
  value,
  onBlur,
}: {
  value: string;
  onBlur: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = value.trim();
    inputRef.current.focus();
  }, [value, inputRef]);
  return (
    <input
      className="block h-6 w-full text-center text-xs font-semibold"
      ref={inputRef}
      onBlur={(e) => {
        onBlur(e.target.value);
      }}
    />
  );
}
