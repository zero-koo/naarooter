'use client';

import { TextEditor } from '@/components/text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../TextInput';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../Button';

type PostForm = {
  title: string;
  contents: SerializedEditorState<SerializedLexicalNode>;
};

const postFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력하세요.' })
    .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
  contents: z.object({
    root: z.record(z.any()),
  }),
});

interface PostCreateOrEditFormProps {
  title: string;
  prevLink: string;
  initialValues?: {
    title: string;
    contents: SerializedEditorState<SerializedLexicalNode>;
  };
  onSubmit: (data: PostForm) => void;
}

export const PostCreateOrEditForm = ({
  title,
  prevLink,
  initialValues,
  onSubmit,
}: PostCreateOrEditFormProps) => {
  const { register, control, handleSubmit, formState } = useForm<PostForm>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="flex flex-col bg-base-200">
      <header className="relative flex items-center justify-between p-3">
        <Link href={prevLink}>
          <ArrowLeft size="20" />
        </Link>
        <h1 className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2 font-bold">
          {title}
        </h1>
        <Button
          size="sm"
          ghost
          disabled={!formState.isValid || formState.isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          완료
        </Button>
      </header>
      <form
        className="flex flex-1 flex-col gap-2 overflow-auto p-3 pt-1"
        autoComplete="off"
      >
        <TextInput
          className="text-md shrink-0 font-semibold"
          placeholder="제목을 입력하세요"
          error={!!formState.errors.title?.message}
          {...register('title')}
        />
        <Controller
          control={control}
          name="contents"
          render={({ field: { onChange } }) => (
            <TextEditor
              initialContents={initialValues?.contents}
              containerClass="text-sm rounded-lg border-neutral focus-within:border-primary focus-within:outline-primary focus-within:outline outline-offset-2"
              placeholder="입력하세요"
              onChange={(state) => {
                onChange(state.toJSON());
              }}
            />
          )}
        ></Controller>
      </form>
    </div>
  );
};
