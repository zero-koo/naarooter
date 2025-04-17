'use client';

import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

import { useToast } from '@/hooks/useToast';

import BasePostForm from '../BasePostForm';

export const PostCreateForm = ({ communityId }: { communityId?: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { toast } = useToast();

  const apiUtils = api.useUtils();

  const { mutate } = api.post.create.useMutation({
    onSuccess(data) {
      toast.update({
        message: '글이 생성되었습니다.',
        theme: 'success',
      });

      router.push(pathName.replace('/create', `/post/${data.id}`));
      apiUtils.post.list.invalidate();
      apiUtils.post.myList.invalidate();
    },
    onError() {
      toast.update({
        message: '글이 생성되지 않았습니다. 잠시 후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <BasePostForm
      title={'글 쓰기'}
      communityId={communityId}
      initialValues={{
        title: '',
      }}
      backLink={`${pathName.replace(`/create`, '') || '/'}`}
      onSubmit={(data) => {
        if (!communityId) return;
        mutate({
          title: data.title,
          communityId,
          description: data.contents ?? '',
          images: [], // TODO: Check!
        });
      }}
      onCommunityChange={(communityId) => {
        router.push(`/community/${communityId}/create`);
      }}
    />
  );
};
