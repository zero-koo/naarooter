'use client';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import PostShowComponent from './PostShow.component';
import PostCommentSection from '../poll/PostCommentSection';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PostShowProps {
  id: string;
}

const PostShow = ({ id }: PostShowProps) => {
  const { data } = usePostQuery(id);
  const { user, isLoaded } = useUser();

  if (!data || !isLoaded) return 'Loading...';

  return (
    <div>
      <div className="flex items-center bg-base-200 p-3 pb-0">
        <Link href={'/posts'}>
          <ArrowLeft size={20} />
        </Link>
      </div>
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
