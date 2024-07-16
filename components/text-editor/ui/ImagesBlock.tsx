import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { ElementFormatType, NodeKey } from 'lexical';

import { ImageItem } from '../nodes/ImagesNode';
import { ImageCaption } from './ImageCaption';
import { ImageCarousel } from './ImageCarousel';
import ImageSingleView from './ImageSingleView';

export function ImagesBlock({
  images,
  index,
  hasCaption,
  caption,
  className,
  readonly,
  format,
  nodeKey,
  onChangeCaption,
  onRemoveCaption,
}: {
  images: Array<ImageItem>;
  index: number | null;
  hasCaption: boolean;
  caption: string;
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  readonly?: boolean;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  onChangeCaption?: (caption: string) => void;
  onRemoveCaption?: () => void;
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
            src: image.blobURL ?? image.srcURL,
            uploadPromise: image.uploadPromise,
          }))}
          index={index}
          readonly={readonly}
        />
      ) : (
        <ImageSingleView
          src={images[0].blobURL ?? images[0].srcURL}
          uploadPromise={images[0].uploadPromise}
          index={index}
          readonly={readonly}
        />
      )}
      <ImageCaption
        hasCaption={hasCaption}
        readonly={readonly}
        initialValue={caption}
        onChangeCaption={onChangeCaption}
        onRemoveCaption={onRemoveCaption}
      />
    </BlockWithAlignableContents>
  );
}
