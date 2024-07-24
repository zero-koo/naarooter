import React from 'react';
import { UserReaction } from '@/types/shared';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type ReactionButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  likeCount: number;
  dislikeCount: number;
  selectedReaction: UserReaction;
  readonly?: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
};

const ReactionButton = ({
  likeCount,
  dislikeCount,
  selectedReaction,
  onClickLike,
  onClickDislike,
  className,
  ...props
}: ReactionButtonProps) => {
  return (
    <div className={cn('flex gap-4 text-xs opacity-80', className)} {...props}>
      <Button count={likeCount} onClick={onClickLike}>
        <ThumbsUpIcon
          className={cn({
            'text-primary': selectedReaction === 'like',
          })}
          size={12}
          fill={selectedReaction === 'like' ? 'currentColor' : 'transparent'}
        />
      </Button>
      <Button count={dislikeCount} onClick={onClickDislike}>
        <ThumbsDownIcon
          size={12}
          className={cn({
            'text-primary': selectedReaction === 'dislike',
          })}
          fill={selectedReaction === 'dislike' ? 'currentColor' : 'transparent'}
        />
      </Button>
    </div>
  );
};

const Button = ({
  count,
  children,
  readonly,
  onClick,
}: React.HTMLAttributes<HTMLButtonElement> & {
  count: number;
  readonly?: boolean;
}) => {
  return (
    <div className="-ml-2 flex items-center">
      <button
        className={cn(
          'flex items-center rounded-full p-2 hover:bg-base-content/20',
          {
            'pointer-events-none': readonly,
          }
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
      >
        {children}
      </button>
      <span className="-ml-1 min-w-2">{count}</span>
    </div>
  );
};

export default ReactionButton;
