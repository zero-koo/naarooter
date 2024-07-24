import { usePostReaction } from '@/hooks/usePostReaction';

import ReactionButton from '../ReactionButton';

type PostLikeDislikeProps = React.HTMLAttributes<HTMLDivElement> & {
  postId: string;
  readonly?: boolean;
};

const PostLikeDislike = ({ postId, ...props }: PostLikeDislikeProps) => {
  const postReaction = usePostReaction(postId);
  return <ReactionButton {...props} {...postReaction} />;
};

export default PostLikeDislike;
