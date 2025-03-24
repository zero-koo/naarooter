'use client';

import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useImageUpload } from '@/hooks/useImageUpload';

import CommunitySelector from './CommunitySelector';
import DefaultItemHeader from './DefaultItemHeader';
import MainLayout from './layouts/MainLayout';
import { ToolbarItem } from './text-editor/plugins/ToolbarPlugin';
import TextEditor, { TextEditorHandle } from './text-editor/TextEditor';
import { Button } from './ui/Button';
import GrayBox from './ui/GrayBox';
import TextInput from './ui/TextInput';

type BaseForm = {
  communityId: string;
  title: string;
  contents: string;
};

const baseFromSchema = z.object({
  communityId: z.string(),
  title: z
    .string()
    .min(1, { message: '제목을 입력하세요.' })
    .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
  contents: z.string().optional(),
});

type BaseTitleDescriptionFormProps = {
  title: React.ReactNode;
  backLink: string;
  initialValues?: {
    title: string;
    communityId?: string;
    contents: string;
  };
  communityUpdateDisabled?: boolean;
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
  communityUpdateDisabled,
  maxContentNode,
  disableDragDrop,
  submitButtonName,
  onSubmit,
}: BaseTitleDescriptionFormProps) {
  const { register, control, setValue, handleSubmit, formState } =
    useForm<BaseForm>({
      resolver: zodResolver(baseFromSchema),
      defaultValues: initialValues,
    });

  const editor = useRef<TextEditorHandle>(null);
  const { uploadImage } = useImageUpload();

  return (
    <form className="h-full" autoComplete="off">
      <MainLayout
        header={
          <DefaultItemHeader
            title={title}
            backLink={backLink}
            right={
              <Button
                size="sm"
                type="button"
                disabled={!formState.isValid || formState.isSubmitting}
                onClick={async () => {
                  if (!editor.current) return;
                  setValue(
                    'contents',
                    await editor.current.getSerializedState()
                  );
                  handleSubmit(onSubmit)();
                }}
              >
                {submitButtonName ?? '완료'}
              </Button>
            }
          />
        }
        body={
          <>
            <GrayBox className="px-4 py-2 md:px-3">
              <div className="mb-3">
                <Controller
                  control={control}
                  name={'communityId'}
                  render={({ field: { value, onChange } }) => (
                    <CommunitySelector
                      value={value}
                      disabled={communityUpdateDisabled}
                      onChange={onChange}
                    />
                  )}
                ></Controller>
              </div>
              <TextInput
                size="lg"
                className="p-0"
                placeholder="제목을 입력하세요"
                error={!!formState.errors.title?.message}
                {...register('title')}
              />
            </GrayBox>
            <div className="flex flex-1 flex-col overflow-auto pt-2">
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
            </div>
          </>
        }
      />
    </form>
  );
}
