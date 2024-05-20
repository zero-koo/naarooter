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
import { useRootEditorContext } from '../contexts/RootEditorContext';

export type SerializedImagesNode = Spread<
  {
    images: Array<ImageItem>;
    caption: string;
    index: number | null;
  },
  SerializedDecoratorBlockNode
>;

export type ImageItem = {
  uploadPromise?: Promise<string>;
} & (
  | {
      blobURL: string;
      srcURL?: undefined;
    }
  | {
      blobURL?: undefined;
      srcURL: string;
    }
  | {
      blobURL: string;
      srcURL: string;
    }
);

export const imageUploadPromiseCache = new Map<string, Promise<string>>();

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
        images: [...node.__images],
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
      images: this.__images.map(
        (image) =>
          ({
            blobURL: image.blobURL,
            srcURL: image.srcURL,
          } as ImageItem)
      ),
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
    this.__images = images.map((image) => {
      if (!image.blobURL && !image.srcURL) {
        throw Error('One of bloblURL or srcURL must be provided!');
      }

      return {
        blobURL: image.blobURL,
        srcURL: image.srcURL,
        uploadPromise: image.blobURL
          ? imageUploadPromiseCache.get(image.blobURL)
          : undefined,
      } as ImageItem;
    });
    this.__caption = caption;
    this.__index = index;
  }

  updateDOM(): false {
    return false;
  }

  setImages(images: ImageItem[]) {
    const writable = this.getWritable();
    writable.__images = [...images];
  }

  setIndex(index: number) {
    const writable = this.getWritable();
    writable.__index = index;
  }

  addItems(images: Array<ImageItem>, at: number) {
    const writable = this.getWritable();
    writable.__images = [
      ...this.__images.slice(0, at + 1),
      ...images.slice(0, 5 - this.__images.length),
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
  images: Array<ImageItem>;
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
  onAddImages: (images: ImageItem[], at: number) => void;
  onRemoveItem: (subIndex: number) => void;
  onChangeCaption: (caption: string) => void;
}) {
  const { onAddImage } = useRootEditorContext();

  const [hasCaption, setHasCaption] = useState(!!caption?.trim());
  const [captionValue, setCaptionValue] = useState(caption);
  const [isEditMode, setIsEditMode] = useState(false);

  function handleAddImages(images: File[], at = 0) {
    onAddImages(
      images.map((image) => {
        const blobURL = URL.createObjectURL(image);
        const uploadPromise = onAddImage?.({ image });

        if (uploadPromise && !imageUploadPromiseCache.has(blobURL)) {
          imageUploadPromiseCache.set(blobURL, uploadPromise);
        }

        return {
          blobURL,
          uploadPromise,
        };
      }),
      at
    );
  }

  function handleToggleCaption(hasCaption: boolean) {
    if (hasCaption) {
      setHasCaption(true);
      onChangeCaption?.(captionValue);
      setIsEditMode(true);
    } else {
      setHasCaption(false);
      onChangeCaption?.('');
      setIsEditMode(false);
    }
  }

  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      {images.length > 1 ? (
        <ImageCarousel
          images={images.map((image) => ({
            src: image.blobURL ?? image.srcURL,
            uploadPromise: image.uploadPromise,
          }))}
          index={index}
          hasCaption={hasCaption}
          onAddImages={handleAddImages}
          onRemove={onRemoveItem}
          onToggleCaption={handleToggleCaption}
        />
      ) : (
        <SingleImageComponent
          src={images[0].blobURL ?? images[0].srcURL}
          uploadPromise={images[0].uploadPromise}
          index={index}
          hasCaption={hasCaption}
          onAddImages={handleAddImages}
          onToggleCaption={handleToggleCaption}
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
              className="min-h-6 absolute inset-x-0 flex items-center overflow-hidden text-ellipsis px-2 text-xs font-semibold"
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
  uploadPromise,
  index,
  hasCaption,
  readonly,
  onToggleCaption,
  onAddImages,
  onRemove,
}: {
  src: string;
  uploadPromise?: Promise<string>;
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
        uploadPromise={uploadPromise}
        ImageComponent={({ src }) => (
          <Image
            src={src}
            alt={'Image'}
            className="w-full"
            width={500}
            height={500}
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
      className="block h-6 w-full text-xs font-semibold"
      ref={inputRef}
      onBlur={(e) => {
        onBlur(e.target.value);
      }}
    />
  );
}
