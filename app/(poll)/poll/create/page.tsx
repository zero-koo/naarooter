'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trpc } from '@/client/trpcClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, MinusCircle, PlusIcon, XIcon } from 'lucide-react';
import {
  Controller,
  SubmitErrorHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import z from 'zod';

import { PollInput } from '@/types/poll';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { Toggle } from '@/components/Toggle';
import { SingleImageUploader } from '@/components/SingleImageUploader';
import { cn } from '@/lib/utils';
import { useEdgeStore } from '@/lib/edgestore';

export default function CreatePollPage() {
  return <PollForm />;
}

const MIN_CHOICE_COUNT = 2;
const MAX_CHOICE_COUNT = 5;

const MAX_POLL_TITLE_LENGTH = 100;
const MAX_POLL_DESCRIPTION_LENGTH = 200;
const MAX_CHOICE_TITLE_LENGTH = 100;

const pollFormSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: '제목을 입력하세요.' })
      .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
    description: z.string(),
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

  const { edgestore } = useEdgeStore();

  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm<z.infer<typeof pollFormSchema>>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: '',
      description: '',
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

  const { mutate: createPoll } = trpc.poll.add.useMutation({
    onSuccess(data) {
      toast.update({
        message: '투표가 생성되었습니다.',
        theme: 'success',
      });

      router.push(`/poll/${data.id}`);
    },
  });
  const onSubmit = async (data: PollInput) => {
    const imageUrls = useImage
      ? await Promise.all(
          data.choices.map((choice) =>
            edgestore.publicFiles
              .upload({
                file: choice.image!,
              })
              .then((image) => image.url)
          )
        )
      : data.choices.map(() => undefined);

    createPoll({
      ...data,
      choices: data.choices.map((choice, index) => ({
        main: choice.main,
        imageUrl: imageUrls[index],
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
    <div className="flex flex-col bg-base-200">
      <header className="relative flex items-center justify-between p-3">
        <Link href="/">
          <ArrowLeft size="20" />
        </Link>
        <h1 className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2 font-bold">
          설문 만들기
        </h1>
        <Button size="sm" ghost onClick={handleSubmit(onSubmit, onInvalid)}>
          완료
        </Button>
      </header>
      <form
        className="flex flex-1 flex-col gap-2 overflow-auto p-3 pt-1"
        autoComplete="off"
      >
        <TextInput
          className="shrink-0 font-semibold"
          placeholder="제목을 입력하세요"
          error={!!errors.title?.message}
          maxLength={MAX_POLL_TITLE_LENGTH}
          {...register('title')}
        />
        <TextArea
          size="xs"
          className="shrink-0 p-3"
          placeholder="내용을 적어주세요"
          maxLength={MAX_POLL_DESCRIPTION_LENGTH}
          {...register('description')}
        />
        <div className="mt-2 flex items-center pl-3 pr-1">
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
            className="relative flex items-center overflow-hidden rounded-lg border border-neutral pr-3 focus-within:border-primary-focus focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
          >
            {useImage && (
              <div className="flex h-16 w-16 items-center justify-center border-r border-neutral">
                <Controller
                  control={control}
                  name={`choices.${index}.image`}
                  render={({ field: { value, onChange } }) => (
                    <SingleImageUploader value={value} onChange={onChange} />
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
          className="ml-auto border-neutral"
          disabled={fields.length >= MAX_CHOICE_COUNT}
          RightIcon={PlusIcon}
          onClick={handleAddChoice}
        >
          보기 추가
        </Button>
      </form>
    </div>
  );
}
