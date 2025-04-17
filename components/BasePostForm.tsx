'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { postTitleSchema } from '@/schemas/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useImageUpload } from '@/hooks/useImageUpload';

import CommunityDescription from './community/CommunityDescription';
import CommunityDescriptionView from './community/CommunityDescriptionView';
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
  contents?: string;
};

const basePostFormSchema = z.object({
  communityId: z.string(),
  title: postTitleSchema,
  contents: z.string().optional(),
});

type BasePostFormProps = {
  title: React.ReactNode;
  communityId?: string;
  backLink: string;
  initialValues?: {
    title: string;
    contents?: string;
  };
  communityFixed?: boolean;
  toolbarItems?: ToolbarItem[];
  maxContentNode?: number;
  disableDragDrop?: boolean;
  submitButtonName?: string;
  onCommunityChange?: (communityId: string) => void;
  onSubmit: (data: BaseForm) => void;
};

export default function BasePostForm({
  title,
  communityId,
  backLink,
  initialValues,
  toolbarItems,
  communityFixed,
  maxContentNode,
  disableDragDrop,
  submitButtonName,
  onSubmit,
  onCommunityChange,
}: BasePostFormProps) {
  const { register, setValue, handleSubmit, formState } = useForm<BaseForm>({
    resolver: zodResolver(basePostFormSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          communityId,
        }
      : {
          communityId,
        },
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
                <CommunitySelector
                  value={communityId}
                  disabled={communityFixed}
                  onChange={onCommunityChange}
                />
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
        aside={
          communityId ? (
            <CommunityDescription communityId={communityId} />
          ) : null
        }
      />
    </form>
  );
}
