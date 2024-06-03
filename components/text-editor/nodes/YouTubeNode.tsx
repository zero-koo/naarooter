import type {
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import YoutubeEmbed from '../ui/YoutubeEmbed';
import YouTubeInputDialog from '../ui/YouTubeInsertModal';
import { Edit, MoreVerticalIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getYoutubeVideoIdFromLink } from '../utils';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

type YouTubeNodeBlockProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  link: string;
  readonly?: boolean;
  onChangeLink: (link: string) => void;
  onRemove: () => void;
}>;

function YouTubeNodeBlock({
  className,
  format,
  nodeKey,
  link,
  readonly,
  onChangeLink,
  onRemove,
}: YouTubeNodeBlockProps) {
  const [open, setOpen] = useState(false);
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <div className={'relative'}>
        <YoutubeEmbed className="aspect-video w-full" link={link} />
        {!readonly && (
          <>
            <div className="absolute bottom-0 right-0 flex p-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    size="xs"
                    shape={'square'}
                    className="bg-base-100/60 text-primary-content/80 hover:bg-base-100/90"
                  >
                    <MoreVerticalIcon size={20} />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-18 min-w-0 rounded-sm border border-base-content/10 bg-base-100/70 text-xs text-primary-content shadow"
                  side="top"
                  sideOffset={2}
                  align="end"
                >
                  <DropdownMenuItem
                    className={cn(
                      'flex select-none items-center justify-between gap-3 p-1.5 cursor-pointer'
                    )}
                    onClick={() => setOpen(true)}
                  >
                    <Edit size={14} />
                    <div>수정</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex cursor-pointer select-none items-center justify-between gap-3 p-1.5"
                    onClick={() => onRemove()}
                  >
                    <Trash2 size={14} />
                    <div>삭제</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <YouTubeInputDialog
              open={open}
              initialLink={link}
              onSave={onChangeLink}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      </div>
    </BlockWithAlignableContents>
  );
}

export type SerializedYouTubeNode = Spread<
  {
    link: string;
  },
  SerializedDecoratorBlockNode
>;

export class YouTubeNode extends DecoratorBlockNode {
  __link: string;

  static getType(): string {
    return 'youtube';
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__link, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.link);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: 'youtube',
      version: 1,
      link: this.__link,
    };
  }

  constructor(link: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__link = link;
  }

  updateDOM(): false {
    return false;
  }

  getId(): string | null {
    return getYoutubeVideoIdFromLink(this.__link);
  }

  changeLink(link: string) {
    const writable = this.getWritable();
    writable.__link = link;
  }

  // getTextContent(): string {
  //   return `https://www.youtube.com/watch?v=${this.__link}`;
  // }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: cn('my-1', embedBlockTheme.base || ''),
      focus: embedBlockTheme.focus || '',
    };

    return (
      <YouTubeNodeBlock
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        link={this.__link}
        readonly={config.namespace === 'read-only'}
        onChangeLink={(link) => {
          _editor.update(() => {
            this.changeLink(link);
          });
        }}
        onRemove={() => {
          _editor.update(() => {
            this.remove();
          });
        }}
      />
    );
  }
}

export function $createYouTubeNode(link: string): YouTubeNode {
  return new YouTubeNode(link);
}

export function $isYouTubeNode(
  node: YouTubeNode | LexicalNode | null | undefined
): node is YouTubeNode {
  return node instanceof YouTubeNode;
}
