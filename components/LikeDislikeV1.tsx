import { cn } from '@/lib/utils';
import { UserReaction } from '@/types/shared';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

const LikeDislikeV1 = ({
  likeCount,
  dislikeCount,
  userSelect,
  onClickLike,
  onClickDislike,
}: {
  likeCount: number;
  dislikeCount: number;
  userSelect: UserReaction;
  onClickLike: () => void;
  onClickDislike: () => void;
}) => {
  return (
    <>
      <div className="mr-3 flex items-center gap-1 text-xs">
        <ThumbsUpIcon
          size={12}
          className={cn({
            'text-primary': userSelect === 'like',
          })}
          fill={userSelect === 'like' ? 'currentColor' : 'transparent'}
          onClick={onClickLike}
        />
        <div>{likeCount.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-1 text-xs">
        <ThumbsDownIcon
          size={12}
          className={cn({
            'text-primary': userSelect === 'dislike',
          })}
          fill={userSelect === 'dislike' ? 'currentColor' : 'transparent'}
          onClick={onClickDislike}
        />
        <div>{dislikeCount.toLocaleString()}</div>
      </div>
    </>
  );
};

export default LikeDislikeV1;
