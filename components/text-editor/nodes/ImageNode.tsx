/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import Image from 'next/image';
import * as React from 'react';
import { Suspense } from 'react';

export interface ImagePayload {
  key?: NodeKey;
  src: string;
  width: number;
  height: number;
  altText: string;
}

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode;
    const node = $createImageNode({ altText, height, src, width });
    return { node };
  }
  return null;
}

export type SerializedImageNode = Spread<
  {
    src: string;
    width: number;
    height: number;
    altText: string;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __width: number;
  __height: number;
  __altText: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, src } = serializedNode;
    const node = $createImageNode({
      altText,
      height,
      src,
      width,
    });
    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(
    src: string,
    altText: string,
    width: number,
    height: number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.src,
      width: this.__width,
      height: this.__height,
      altText: this.altText,
    };
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  // View
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  get src(): string {
    return this.__src;
  }

  get width(): number {
    return this.__width;
  }

  get height(): number {
    return this.__height;
  }

  get altText(): string {
    return this.__altText;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <Image
          src={this.__src}
          alt={this.__altText}
          width={this.__width}
          height={this.__height}
        />
      </Suspense>
    );
  }
}

export function $createImageNode({
  src,
  width,
  height,
  altText,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, width, height));
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
