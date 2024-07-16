'use client';

import { useEffect, useState } from 'react';
import { trpc } from '@/client/trpcClient';
import { PostContextProvider } from '@/contexts/PostContext';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useUser } from '@/hooks/useUser';

import CommentList from '../comment/CommentList';
import PostShowComponent from './PostShow.component';

interface PostShowProps {
  id: string;
}

const PostShow = ({ id }: PostShowProps) => {
  const [post] = usePostQuery(id);
  const { user } = useUser();

  const [like, setLike] = useState<{
    count: number;
    selected: boolean;
  }>({
    count: 0,
    selected: false,
  });

  const [dislike, setDislike] = useState<{
    count: number;
    selected: boolean;
  }>({
    count: 0,
    selected: false,
  });

  useEffect(() => {
    if (!post) return;
    setLike({
      count: post.postReaction.likeCount,
      selected: post.postReaction.userReaction === 'like',
    });
    setDislike({
      count: post.postReaction.dislikeCount,
      selected: post.postReaction.userReaction === 'dislike',
    });
  }, [post]);

  const { mutate } = trpc.post.reaction.useMutation();

  return (
    <PostContextProvider postId={id}>
      <PostShowComponent
        groupId={post.groupId}
        id={id}
        title={post.title}
        description={post.description as string}
        author={post.author}
        isAuthor={post.authorId === user?.id}
        createdAt={post.createdAt}
        viewCount={post.viewCount}
        like={like}
        dislike={dislike}
        onClickLike={({ isCancel }) => {
          mutate({
            postId: id,
            type: isCancel ? 'cancel' : 'like',
          });
          setLike((like) => ({
            count: isCancel ? like.count - 1 : like.count + 1,
            selected: !isCancel,
          }));
          setDislike((dislike) =>
            dislike.selected
              ? {
                  count: dislike.count - 1,
                  selected: false,
                }
              : { ...dislike }
          );
        }}
        onClickDislike={({ isCancel }) => {
          mutate({
            postId: id,
            type: isCancel ? 'cancel' : 'dislike',
          });
          setDislike((dislike) => ({
            count: isCancel ? dislike.count - 1 : dislike.count + 1,
            selected: !isCancel,
          }));
          setLike((like) =>
            like.selected
              ? {
                  count: like.count - 1,
                  selected: false,
                }
              : { ...like }
          );
        }}
      />
      <CommentList postId={id} />
    </PostContextProvider>
  );
};

export default PostShow;
