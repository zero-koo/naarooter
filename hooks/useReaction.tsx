import { useState } from 'react';
import { Reaction, UserReaction } from '@/types/shared';

export const useReaction = ({
  initialValue,
  onUpdate,
}: {
  initialValue?: Reaction;
  onUpdate?: (value: UserReaction) => void;
} = {}): Reaction & {
  onClickLike: () => void;
  onClickDislike: () => void;
} => {
  const [likeCount, setLikeCount] = useState(initialValue?.likeCount ?? 0);
  const [dislikeCount, setDislikeCount] = useState(
    initialValue?.dislikeCount ?? 0
  );
  const [selectedReaction, setUserReaction] = useState<UserReaction>(
    initialValue?.selectedReaction ?? null
  );

  const onClickLike = () => {
    if (!onUpdate) return;

    onUpdate('like');

    if (selectedReaction === 'like') {
      setLikeCount((count) => count - 1);
      setUserReaction(null);
      return;
    }
    if (selectedReaction === 'dislike') {
      setDislikeCount((count) => count - 1);
    }
    setLikeCount((count) => count + 1);
    setUserReaction('like');
  };

  const onClickDislike = () => {
    if (!onUpdate) return;

    onUpdate('dislike');

    if (selectedReaction === 'dislike') {
      setDislikeCount((count) => count - 1);
      setUserReaction(null);
      return;
    }
    if (selectedReaction === 'like') {
      setLikeCount((count) => count - 1);
    }
    setDislikeCount((count) => count + 1);
    setUserReaction('dislike');
  };

  return {
    likeCount,
    dislikeCount,
    selectedReaction,
    onClickLike,
    onClickDislike,
  };
};
