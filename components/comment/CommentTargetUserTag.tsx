import { cn } from '@/lib/utils';

const CommentTargetUserTag = ({
  className,
  username,
}: {
  className?: string;
  username: string;
}) => {
  return (
    <div
      className={cn(
        'bg-primary/20 w-fit max-w-[200px] overflow-hidden text-ellipsis rounded-md px-1 py-0.5 text-xs',
        className
      )}
    >{`@${username}`}</div>
  );
};

export default CommentTargetUserTag;
