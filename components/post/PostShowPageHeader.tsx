'use client';

import { usePathname } from 'next/navigation';

import DefaultItemHeader from '../DefaultItemHeader';

const PostShowPageHeader = ({ postId }: { postId: string }) => {
  const pathName = usePathname();

  return (
    <DefaultItemHeader
      backLink={`${pathName.replace(`/post/${postId}`, '') || '/'}`}
    />
  );
};

export default PostShowPageHeader;
