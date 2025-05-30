'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { PollInput } from '@/types/poll';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeftIcon,
  ImagePlusIcon,
  ImagesIcon,
  MinusCircle,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import {
  Controller,
  SubmitErrorHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import z from 'zod';

import { cn, uploadImages } from '@/lib/utils';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import GrayBox from '@/components/ui/GrayBox';
import { IconButton } from '@/components/ui/IconButton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import TextInput from '@/components/ui/TextInput';
import ActionMenu from '@/components/ActionMenu';
import CommunitySelector from '@/components/CommunitySelector';
import DefaultItemHeader from '@/components/DefaultItemHeader';
import ImageCarousel from '@/components/ImageCarousel';
import PollSubmitPreview from '@/components/poll/PollSubmitPreview';
import { SingleImageUploader } from '@/components/SingleImageUploader';
import PlainTextEditor from '@/components/text-editor/PlainTextEditor';
import { Toggle } from '@/components/Toggle';

export default function CreatePollPage() {
  return <PollForm />;
}

const MIN_CHOICE_COUNT = 2;
const MAX_CHOICE_COUNT = 20;
const MAX_CHOICE_TITLE_LENGTH = 100;

const pollFormSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: '제목을 입력하세요.' })
      .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
    communityId: z.string(),
    description: z.string().optional(),
    useImage: z.boolean(),
    choices: z.array(
      z.object({
        main: z.string().min(1, { message: '보기를 입력하세요.' }),
        image: z.instanceof(File).optional(),
      })
    ),
  })
  .refine(
    ({ useImage, choices }) => {
      if (!useImage) return true;
      return choices.every((choice) => !!choice.image);
    },
    {
      message: '이미지를 삽입하세요.',
    }
  );

function PollForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { uploadImage } = useImageUpload();

  const [imagesPromise, setImagesPromise] = useState<
    Array<{
      image: File;
      promise: Promise<string>;
    }>
  >([]);

  const { control, formState, register, watch, handleSubmit } = useForm<
    z.infer<typeof pollFormSchema>
  >({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: '',
      description: undefined,
      useImage: false,
      choices: [
        {
          main: '',
          image: undefined,
        },
        {
          main: '',
          image: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
    rules: {
      minLength: 2,
      maxLength: 5,
    },
  });

  const useImage = watch('useImage');

  const handleAddChoice = () => {
    if (fields.length >= MAX_CHOICE_COUNT) return;
    append({
      main: '',
      image: undefined,
    });
  };

  const { mutate: createPoll, isPending } = api.poll.create.useMutation({
    onSuccess(data) {
      toast.update({
        message: '투표가 생성되었습니다.',
        theme: 'success',
      });

      router.push(`/polls/${data.post.id}`);
    },
  });
  const onSubmit = async (data: PollInput) => {
    const choiceImageUrls = useImage
      ? await Promise.all(
          data.choices.map((choice) =>
            uploadImage({
              file: choice.image!,
            }).then((image) => image.url)
          )
        )
      : data.choices.map(() => undefined);

    const imageUrls = await Promise.all(
      imagesPromise.map(({ promise }) => promise)
    );

    createPoll({
      ...data,
      communityId: data.communityId ?? null,
      description: data.description ?? '',
      images: imageUrls,
      choices: data.choices.map((choice, index) => ({
        main: choice.main,
        imageUrl: choiceImageUrls[index],
        index,
      })),
    });
  };

  const onInvalid: SubmitErrorHandler<PollInput> = (e) => {
    const message =
      e.title?.message ||
      e.description?.message ||
      e.choices?.find?.((item) => item?.main?.message)?.main?.message;

    message && toast.update({ message, theme: 'error' });
  };

  return (
    <>
      <DefaultItemHeader
        backLink={'/polls'}
        title={'설문 만들기'}
        right={
          <Sheet>
            <SheetTrigger>
              <Button
                size="sm"
                variant={'ghost'}
                disabled={!formState.isValid || formState.isSubmitting}
              >
                완료
              </Button>
            </SheetTrigger>
            <SheetContent className="size-full">
              <SheetHeader className="p-3">
                <SheetClose disabled={isPending}>
                  <ArrowLeftIcon size={20} className="opacity-70" />
                </SheetClose>
              </SheetHeader>
              <div className="p-3 pt-1">
                <div className="flex items-center gap-2">
                  <SheetTitle>미리보기</SheetTitle>
                  <Button
                    variant="primary"
                    className="ml-auto"
                    disabled={isPending}
                    onClick={handleSubmit(onSubmit, onInvalid)}
                  >
                    생성하기
                  </Button>
                </div>
              </div>
              <PollSubmitPreview
                title={watch('title')}
                description={watch('description')}
                images={imagesPromise.map((image) =>
                  URL.createObjectURL(image.image)
                )}
                choices={watch('choices')}
              />
              <div className="mt-1 p-3">
                <div className="alert alert-warning bg-warning/80 flex items-start gap-2 rounded-lg p-2 text-start text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>
                    한 명 이상 투표가 진행된 설문은 작성자 임의로 수정 혹은
                    삭제할 수 없습니다. 내용을 잘 확인해 주세요.
                  </span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        }
      />
      <form
        className="relative flex flex-1 flex-col overflow-auto"
        autoComplete="off"
      >
        <div className="relative">
          <GrayBox className="px-4 py-2 md:px-3">
            <div className="mb-3">
              <Controller
                control={control}
                name={'communityId'}
                render={({ field: { value, onChange } }) => (
                  <CommunitySelector value={value} onChange={onChange} />
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
          {imagesPromise.length ? (
            <div className="px-2 pt-3">
              <ImageCarousel
                images={imagesPromise.map(({ image, promise }) => ({
                  src: image,
                  uploadPromise: promise,
                }))}
                chilrenPerItem={({ index }) => (
                  <div className="absolute bottom-0 right-0 flex p-1">
                    <ActionMenu
                      items={[
                        {
                          name: '추가',
                          icon: ImagePlusIcon,
                          onClick: async () => {
                            const [newImage] = await uploadImages({
                              maxCount: 1,
                            });
                            setImagesPromise((images) => [
                              ...images.slice(0, index + 1),
                              {
                                image: newImage,
                                promise: uploadImage({
                                  file: newImage,
                                }).then((image) => image.url),
                              },
                              ...images.slice(index + 1),
                            ]);
                          },
                        },
                        {
                          name: '삭제',
                          icon: TrashIcon,
                          onClick: () => {
                            setImagesPromise((images) =>
                              images.filter((_, idx) => index !== idx)
                            );
                          },
                        },
                      ]}
                    />
                  </div>
                )}
              />
            </div>
          ) : null}
          <Controller
            control={control}
            name={'description'}
            render={({ field: { value, onChange } }) => (
              <PlainTextEditor
                className="shrink-0"
                placeholder="설명을 적어주세요 (선택)"
                initialValues={value}
                onChange={onChange}
              />
            )}
          />
          <div
            className={cn(
              'border-foreground/40 pointer-events-none absolute bottom-0 left-0 right-0 flex w-full gap-1 border-b p-1'
            )}
          >
            <IconButton
              variant="ghost"
              size="sm"
              disabled={!!imagesPromise.length}
              onClick={async () => {
                const images = await uploadImages({
                  maxCount: 10,
                });
                setImagesPromise(
                  images.map((image) => ({
                    image,
                    promise: uploadImage({
                      file: image,
                    }).then((image) => image.url),
                  }))
                );
              }}
            >
              <ImagesIcon />
            </IconButton>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2 px-2">
          <div className="mt-2 flex items-center">
            <div className="form-control ml-auto">
              <label className="label flex cursor-pointer gap-2 py-0">
                <span className="label-text text-xs font-medium">이미지</span>
                <Toggle theme="primary" size="xs" {...register('useImage')} />
              </label>
            </div>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-neutral focus-within:border-primary-focus focus-within:outline-primary relative flex items-center overflow-hidden rounded-lg border pr-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2"
            >
              {useImage && (
                <div className="border-neutral flex size-16 items-center justify-center border-r">
                  <Controller
                    control={control}
                    name={`choices.${index}.image`}
                    render={({ field: { value, onChange } }) => (
                      <SingleImageUploader
                        value={value}
                        onChange={(file) => onChange(file)}
                      />
                    )}
                  />
                </div>
              )}
              <input
                className={cn('input-md flex h-12 flex-1 px-3', {
                  'h-16': useImage,
                })}
                placeholder={`보기 ${index + 1}`}
                maxLength={MAX_CHOICE_TITLE_LENGTH}
                {...register(`choices.${index}.main`)}
              />
              <button
                className="p-1"
                disabled={fields.length <= MIN_CHOICE_COUNT}
                onClick={() => remove(index)}
              >
                <MinusCircle strokeWidth={1.5} className="opacity-80" />
              </button>
            </div>
          ))}
          <Button
            size="xs"
            className="border-neutral ml-auto"
            disabled={fields.length >= MAX_CHOICE_COUNT}
            RightIcon={PlusIcon}
            onClick={handleAddChoice}
          >
            보기 추가
          </Button>
        </div>
      </form>
    </>
  );
}
