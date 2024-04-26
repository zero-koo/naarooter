import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
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
import { Captions, CaptionsOff, LoaderCircleIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export type SerializedImageNode = Spread<
  {
    src: string;
    caption: string;
    index: number | null;
    isThumbnail: boolean;
  },
  SerializedDecoratorBlockNode
>;

export class ImageNode extends DecoratorBlockNode {
  __src: string;
  __caption: string;
  __index: number | null;
  __isThumbnail: boolean;
  __uploading: boolean;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      {
        src: node.__src,
        caption: node.__caption,
        index: node.__index,
        uploading: node.__uploading,
        isThumbnail: node.__isThumbnail,
      },
      node.__format,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const node = $createImageNode(serializedNode);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: 'image',
      version: 1,
      src: this.__src,
      caption: this.__caption,
      index: this.__index ?? null,
      isThumbnail: this.__isThumbnail,
    };
  }

  constructor(
    {
      src,
      index,
      caption,
      uploading,
      isThumbnail,
    }: {
      src: string | File;
      index?: number | null;
      caption?: string;
      uploading?: boolean;
      isThumbnail: boolean;
    },
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__src = typeof src === 'string' ? src : URL.createObjectURL(src);
    this.__caption = caption ?? '';
    this.__index = index ?? null;
    this.__uploading = uploading ?? false;
    this.__isThumbnail = isThumbnail;
  }

  updateDOM(): false {
    return false;
  }

  setIndex(index: number) {
    const writable = this.getWritable();
    writable.__index = index;
  }

  changeCaption(caption: string) {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  setAsThumnail() {
    const writable = this.getWritable();
    writable.__isThumbnail = true;
  }

  startUpload() {
    const writable = this.getWritable();
    writable.__uploading = true;
  }

  finishUpload(src: string) {
    const writable = this.getWritable();
    writable.__src = src;
    writable.__uploading = false;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: cn('my-1', embedBlockTheme.base || ''),
      focus: embedBlockTheme.focus || '',
    };

    return (
      <ImageComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        src={this.__src}
        index={this.__index}
        caption={this.__caption}
        uploading={this.__uploading}
        readonly={config.namespace === 'read-only'}
        onChangeCaption={(caption) => {
          _editor.update(() => this.changeCaption(caption));
        }}
        onRemove={() => {
          _editor.update(() => this.remove());
        }}
      />
    );
  }
}

type ImageComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  src: string;
  index: number | null;
  caption: string;
  altText?: string;
  uploading?: boolean;
  readonly?: boolean;
  onChangeCaption?: (caption: string) => void;
  onRemove?: () => void;
}>;

function ImageComponent({
  className,
  format,
  nodeKey,
  src,
  index,
  caption,
  altText,
  uploading,
  readonly,
  onChangeCaption,
  onRemove,
}: ImageComponentProps) {
  const [hasCaption, setHasCaption] = useState(!!caption);
  const captionInputRef = useRef<HTMLInputElement>(null);

  console.log({ uploading });

  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <div className={'group relative w-full'}>
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={altText ?? 'Image'}
            className="w-full"
            width={0}
            height={0}
          />
          {index !== null && (
            <div
              className={
                'flex-center absolute right-1 top-1 h-[20px] min-w-[20px] select-none rounded-full bg-base-100/80 px-1 py-0.5 text-xs'
              }
            >
              {index + 1}
            </div>
          )}
          {uploading && (
            <div className="flex-center absolute inset-0 bg-neutral/70">
              <LoaderCircleIcon className="animate-spin" size={32} />
            </div>
          )}
          {!readonly && (
            <div className="absolute bottom-1 left-1 hidden gap-1 rounded-sm shadow group-hover:flex">
              <IconButton
                size={'xs'}
                onClick={async () => {
                  if (hasCaption) {
                    setHasCaption(false);
                    onChangeCaption?.('');
                    return;
                  }
                  setHasCaption(true);
                  await new Promise(requestAnimationFrame);
                  captionInputRef.current?.focus();
                }}
              >
                {hasCaption ? (
                  <CaptionsOff size={20} />
                ) : (
                  <Captions size={20} />
                )}
              </IconButton>
              <IconButton size={'xs'} onClick={() => onRemove?.()}>
                <Trash2 size={20} />
              </IconButton>
            </div>
          )}
        </div>
        {hasCaption && (
          <input
            className={cn(
              'w-full text-center text-sm font-semibold focus:border-b border-base-content/30'
            )}
            ref={captionInputRef}
            disabled={readonly}
            onBlur={(e) => {
              const caption = e.target.value.trim();
              onChangeCaption?.(caption);
              if (!caption) setHasCaption(false);
            }}
          />
        )}
      </div>
    </BlockWithAlignableContents>
  );
}

export function $createImageNode({
  src,
  caption,
  isThumbnail,
}: {
  src: string | File;
  caption?: string;
  isThumbnail: boolean;
}): ImageNode {
  return new ImageNode({ src, caption, isThumbnail });
}

export function $isImageNode(
  node: ImageNode | LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
