import { useState } from 'react';
import { Reaction, UserReaction } from '@/types/shared';

export const useReaction = ({
  initialValue,
  onUpdate,
}: {
  initialValue?: Reaction;
  onUpdate?: (value: UserReaction) => void;
} = {}) => {
  const [likeCount, setLikeCount] = useState(initialValue?.likeCount ?? 0);
  const [dislikeCount, setDislikeCount] = useState(
    initialValue?.dislikeCount ?? 0
  );
  const [userReaction, setUserReaction] = useState<UserReaction>(
    initialValue?.userReaction ?? null
  );

  const onClickLike = () => {
    if (!onUpdate) return;

    onUpdate('like');

    if (userReaction === 'like') {
      setLikeCount((count) => count - 1);
      setUserReaction(null);
      return;
    }
    if (userReaction === 'dislike') {
      setDislikeCount((count) => count - 1);
    }
    setLikeCount((count) => count + 1);
    setUserReaction('like');
  };

  const onClickDislike = () => {
    if (!onUpdate) return;

    onUpdate('dislike');

    if (userReaction === 'dislike') {
      setDislikeCount((count) => count - 1);
      setUserReaction(null);
      return;
    }
    if (userReaction === 'like') {
      setLikeCount((count) => count - 1);
    }
    setDislikeCount((count) => count + 1);
    setUserReaction('dislike');
  };

  return {
    likeCount,
    dislikeCount,
    userReaction,
    onClickLike,
    onClickDislike,
  };
};
