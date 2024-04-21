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
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { getYoutubeVideoIdFromLink } from '../utils';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

type YouTubeComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  link: string;
  readonly?: boolean;
  onChangeLink: (link: string) => void;
}>;

function YouTubeComponent({
  className,
  format,
  nodeKey,
  link,
  readonly,
  onChangeLink,
}: YouTubeComponentProps) {
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
            <IconButton
              className="absolute bottom-1 right-1"
              onClick={() => setOpen(true)}
            >
              <Edit />
            </IconButton>
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
      <YouTubeComponent
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
