'use client';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import PostShowComponent from './PostShow.component';
import { useUser } from '@/hooks/useUser';
import DefaultItemHeader from '../DefaultItemHeader';
import { trpc } from '@/client/trpcClient';
import { useEffect, useState } from 'react';
import CommentList from '../comment/CommentList';
import { PostContextProvider } from '@/contexts/PostContext';

interface PostShowProps {
  id: string;
  listGroupId?: string;
}

const PostShow = ({ id, listGroupId }: PostShowProps) => {
  const { data } = usePostQuery(id);
  const { user, isAuthenticated } = useUser();

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
    if (!data) return;
    setLike({
      count: data.postReaction.likeCount,
      selected: data.postReaction.userReaction === 'like',
    });
    setDislike({
      count: data.postReaction.dislikeCount,
      selected: data.postReaction.userReaction === 'dislike',
    });
  }, [data]);

  const { mutate } = trpc.post.reaction.useMutation();

  if (!data || !isAuthenticated) return 'Loading...';

  return (
    <PostContextProvider postId={id}>
      <DefaultItemHeader
        backLink={listGroupId ? `/posts/group/${listGroupId}` : '/posts'}
      />
      <PostShowComponent
        groupId={data.groupId}
        id={id}
        title={data.title}
        description={data.description as string}
        author={data.author}
        isAuthor={data.authorId === user?.id}
        createdAt={data.createdAt}
        viewCount={data.viewCount}
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
