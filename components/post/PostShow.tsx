'use client';

import { PostContextProvider } from '@/contexts/PostContext';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { usePostReaction } from '@/hooks/usePostReaction';

import CommentList from '../comment/CommentList';
import ReactionButton from '../ReactionButton';
import PostShowComponent from './PostShow.component';

interface PostShowProps {
  id: string;
}

const PostShow = ({ id }: PostShowProps) => {
  const [post] = usePostQuery(id);
  const postReaction = usePostReaction(id);

  return (
    <PostContextProvider postId={post.id}>
      <PostShowComponent
        communityId={post.communityId}
        id={id}
        title={post.title}
        description={post.description as string} // TODO: Remove assertion
        author={post.author}
        isAuthor={post.author.isMe}
        createdAt={post.createdAt}
        viewCount={post.viewCount ?? 0}
        footer={
          <div className="flex px-3 py-1">
            <ReactionButton {...postReaction} className="ml-auto" />
          </div>
        }
      />
      <CommentList />
    </PostContextProvider>
  );
};

export default PostShow;
