'use client';

import { TextEditor } from '@/components/text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../TextInput';
import { Button } from '../Button';
import DefaultItemHeader from '../DefaultItemHeader';

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
  backLink: string;
  initialValues?: {
    title: string;
    contents: SerializedEditorState<SerializedLexicalNode>;
  };
  onSubmit: (data: PostForm) => void;
}

export const PostCreateOrEditForm = ({
  title,
  backLink,
  initialValues,
  onSubmit,
}: PostCreateOrEditFormProps) => {
  const { register, control, handleSubmit, formState } = useForm<PostForm>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="flex flex-col bg-base-200">
      <DefaultItemHeader
        title={title}
        backLink={backLink}
        right={
          <Button
            size="sm"
            ghost
            disabled={!formState.isValid || formState.isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            완료
          </Button>
        }
      />
      <form
        className="flex flex-1 flex-col gap-2 overflow-auto p-3"
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
