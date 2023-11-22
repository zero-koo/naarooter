'use client';

import { TextEditor } from '@/components/text-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../TextInput';

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
    root: z.any(),
  }),
});

export const PostCreateForm = () => {
  const { register, control, handleSubmit, formState } = useForm<PostForm>({
    resolver: zodResolver(postFormSchema),
  });
  return (
    <div>
      <TextInput
        className="shrink-0 font-semibold"
        placeholder="제목을 입력하세요"
        error={!!formState.errors.title?.message}
        maxLength={100}
        {...register('title')}
      />
      <Controller
        control={control}
        name="contents"
        render={({ field: { onChange } }) => (
          <TextEditor
            onChange={(state) => {
              onChange(state.toJSON());
            }}
          />
        )}
      ></Controller>
      <button
        onClick={handleSubmit((data) => {
          console.log(data);
        })}
      >
        click
      </button>
    </div>
  );
};
