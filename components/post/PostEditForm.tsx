'use client';

import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useToast } from '@/hooks/useToast';

import BasePostForm from '../BasePostForm';

export const PostEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { toast } = useToast();

  const [post] = usePostQuery(id);
  const apiUtils = api.useUtils();

  const { mutate } = api.post.update.useMutation({
    onSuccess() {
      toast.update({
        message: '글이 수정되었습니다.',
        theme: 'success',
      });

      apiUtils.post.byId.invalidate({ id });
      apiUtils.post.list.invalidate();

      router.push(pathName.replace('/edit', '') || '/');
    },
    onError() {
      toast.update({
        message: '글이 수정되지 않았습니다. 잠시 후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <BasePostForm
      title={'글 수정하기'}
      communityId={post.communityId}
      backLink={`${pathName.replace(`/edit`, '') || '/'}`}
      initialValues={{
        title: post.title,
        contents: post.description,
      }}
      communityFixed
      onSubmit={(data) =>
        mutate({
          postId: id,
          title: data.title,
          description: data.contents ?? '',
          images: [], // TODO:
        })
      }
    />
  );
};
