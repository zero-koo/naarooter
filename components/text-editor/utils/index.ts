import { youtubeLinkRegex } from '@/lib/regex';
import { EditorState, LexicalNode, RootNode } from 'lexical';
import { $isImagesNode, ImagesNode } from '../nodes/ImagesNode';

export function getYoutubeVideoIdFromLink(link: string): string | null {
  const match = link.match(youtubeLinkRegex);
  return match ? match[5] : null;
}

export function traverseTopLevelNodes(
  editorState: EditorState,
  onVisitNode: (node: LexicalNode) => void
): void {
  const root = getRootNode(editorState);
  if (!root.__first) return;

  let node: LexicalNode | null = getNodeByKey(editorState, root.__first);
  while (node) {
    onVisitNode(node);
    if (!node.__next) break;
    node = getNodeByKey(editorState, node.__next);
  }
}

export const getRootNode = (editorState: EditorState) => {
  if (!editorState._nodeMap.has('root')) {
    throw Error('Root node does not exist!');
  }
  return editorState._nodeMap.get('root') as RootNode;
};

export function getImageNodes(editorState: EditorState): Array<ImagesNode> {
  const nodes: ImagesNode[] = [];
  traverseTopLevelNodes(editorState, (node) => {
    if (!$isImagesNode(node)) return;
    nodes.push(node);
  });
  return nodes;
}

export function getNodeByKey(
  editorState: EditorState,
  key: string
): LexicalNode | null {
  return editorState._nodeMap.get(key) ?? null;
}
