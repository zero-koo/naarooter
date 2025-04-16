'use client';

import { usePathname } from 'next/navigation';

import DefaultItemHeader from '../DefaultItemHeader';
import MainLayout from '../layouts/MainLayout';
import PostShow from './PostShow';

export default function PostShowPage({ id }: { id: string }) {
  const pathName = usePathname();

  return (
    <MainLayout
      header={
        <DefaultItemHeader
          backLink={`${pathName.replace(`/post/${id}`, '') || '/'}`}
        />
      }
      body={<PostShow id={id} />}
    />
  );
}
