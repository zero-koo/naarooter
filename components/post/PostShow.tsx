'use client';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import PostShowComponent from './PostShow.component';
import PostCommentSection from '../poll/PostCommentSection';
import { useUser } from '@clerk/nextjs';

interface PostShowProps {
  id: string;
}

const PostShow = ({ id }: PostShowProps) => {
  const { data } = usePostQuery(id);
  const { user, isLoaded } = useUser();

  if (!data || !isLoaded) return 'Loading...';

  return (
    <div>
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
