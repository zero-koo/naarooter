'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRef } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import TextEditor, { TextEditorHandle } from './text-editor/TextEditor';
import DefaultItemHeader from './DefaultItemHeader';
import { Button } from './Button';
import TextInput from './TextInput';
import { ToolbarItem } from './text-editor/plugins/ToolbarPlugin';

type BaseForm = {
  title: string;
  contents: string;
};

const baseFromSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력하세요.' })
    .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
  contents: z.string().optional(),
});

type BaseTitleDescriptionFormProps = {
  title: string;
  backLink: string;
  initialValues?: {
    title: string;
    contents: string;
  };
  toolbarItems?: ToolbarItem[];
  maxContentNode?: number;
  disableDragDrop?: boolean;
  submitButtonName?: string;
  onSubmit: (data: BaseForm) => void;
};

export default function BaseTitleDescriptionForm({
  title,
  backLink,
  initialValues,
  toolbarItems,
  maxContentNode,
  disableDragDrop,
  submitButtonName,
  onSubmit,
}: BaseTitleDescriptionFormProps) {
  const { register, setValue, handleSubmit, formState } = useForm<BaseForm>({
    resolver: zodResolver(baseFromSchema),
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
            {submitButtonName ?? '완료'}
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
          toolbarItems={toolbarItems}
          maxContentNode={maxContentNode}
          disableDragDrop={disableDragDrop}
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
}
