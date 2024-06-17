'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../TextInput';
import { Button } from '../Button';
import DefaultItemHeader from '../DefaultItemHeader';
import TextEditor, { TextEditorHandle } from '../text-editor/TextEditor';
import { useRef } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';

type PostForm = {
  title: string;
  contents: string;
};

const postFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력하세요.' })
    .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
  contents: z.string().optional(),
});

interface PostCreateOrEditFormProps {
  title: string;
  backLink: string;
  initialValues?: {
    title: string;
    contents: string;
  };
  onSubmit: (data: PostForm) => void;
}

export const PostCreateOrEditForm = ({
  title,
  backLink,
  initialValues,
  onSubmit,
}: PostCreateOrEditFormProps) => {
  const { register, setValue, handleSubmit, formState } = useForm<PostForm>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  const editor = useRef<TextEditorHandle>(null);
  const { uploadImage } = useImageUpload();

  return (
    <div className="flex h-full flex-col">
      <DefaultItemHeader
        title={title}
        backLink={backLink}
        right={
          <Button
            size="sm"
            ghost
            disabled={!formState.isValid || formState.isSubmitting}
            onClick={async () => {
              if (!editor.current) return;
              setValue('contents', await editor.current.getSerializedState());
              handleSubmit(onSubmit)();
            }}
          >
            완료
          </Button>
        }
      />
      <form
        autoComplete="off"
        className="-mr-40 flex flex-1 flex-col overflow-auto pr-40"
      >
        <TextInput
          className="w-full shrink-0 text-lg font-semibold"
          ghost
          flat
          placeholder="제목을 입력하세요"
          error={!!formState.errors.title?.message}
          {...register('title')}
        />

        <TextEditor
          ref={editor}
          initialValues={initialValues?.contents}
          onAddImage={async ({ image }) => {
            const { url } = await uploadImage({
              file: image,
            });
            return url;
          }}
        />
      </form>
    </div>
  );
};
