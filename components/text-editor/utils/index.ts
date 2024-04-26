import { youtubeLinkRegex } from '@/lib/regex';
import { $getEditor, $getNodeByKey, $getRoot, LexicalNode } from 'lexical';
import { $isImageNode, ImageNode } from '../nodes/ImageNode';

export function getYoutubeVideoIdFromLink(link: string): string | null {
  const match = link.match(youtubeLinkRegex);
  return match ? match[5] : null;
}

export function $traverseTopLevelNodes(
  onVisitNode: (node: LexicalNode) => void
): void {
  const root = $getRoot();

  if (!root.__first) return;

  let node: LexicalNode | null = $getNodeByKey(root.__first);
  while (node) {
    onVisitNode(node);
    if (!node.__next) break;
    node = $getNodeByKey(node.__next);
  }
}

export function $getImageNodes(): Array<ImageNode> {
  const nodes: ImageNode[] = [];
  $traverseTopLevelNodes((node) => {
    if (!$isImageNode(node)) return;
    nodes.push(node);
  });
  return nodes;
}
