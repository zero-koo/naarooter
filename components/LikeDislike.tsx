import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

export type Reaction = 'like' | 'dislike' | null;

const LikeDislike = ({
  like,
  dislike,
  userSelect,
  onUpdate,
}: {
  like: number;
  dislike: number;
  userSelect: Reaction;
  onUpdate?: (value: Reaction) => Promise<void>;
}) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [select, setSelect] = useState<Reaction>(userSelect);

  return (
    <>
      <div className="mr-3 flex items-center gap-1">
        <ThumbsUpIcon
          size={12}
          fill={select === 'like' ? 'currentColor' : 'transparent'}
          onClick={() => {
            if (!onUpdate) return;

            onUpdate('like');

            if (select === 'like') {
              setLikeCount((count) => count - 1);
              setSelect(null);
              return;
            }
            if (select === 'dislike') {
              setDislikeCount((count) => count - 1);
            }
            setLikeCount((count) => count + 1);
            setSelect('like');
          }}
        />
        <div>{likeCount}</div>
      </div>
      <div className="flex items-center gap-1">
        <ThumbsDownIcon
          size={12}
          fill={select === 'dislike' ? 'currentColor' : 'transparent'}
          onClick={() => {
            if (!onUpdate) return;

            onUpdate('dislike');

            if (select === 'dislike') {
              setDislikeCount((count) => count - 1);
              setSelect(null);
              return;
            }
            if (select === 'like') {
              setLikeCount((count) => count - 1);
            }
            setDislikeCount((count) => count + 1);
            setSelect('dislike');
          }}
        />
        <div>{dislikeCount}</div>
      </div>
    </>
  );
};

export default LikeDislike;
