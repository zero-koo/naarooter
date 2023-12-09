'use client';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import PostShowComponent from './PostShow.component';
import PostCommentSection from '../poll/PostCommentSection';
import { useUser } from '@clerk/nextjs';
import DefaultItemHeader from '../DefaultItemHeader';

interface PostShowProps {
  id: string;
  listGroupId?: string;
}

const PostShow = ({ id, listGroupId }: PostShowProps) => {
  const { data } = usePostQuery(id);
  const { user, isLoaded } = useUser();

  if (!data || !isLoaded) return 'Loading...';

  return (
    <div>
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
      />
      <PostCommentSection postId={id} authorId={data.authorId} />
    </div>
  );
};

export default PostShow;
