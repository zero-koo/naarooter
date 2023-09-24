'use client';

import { useState } from 'react';
import { trpc } from '@/client/trpcClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { MinusCircle, PlusIcon, XIcon } from 'lucide-react';
import { SubmitErrorHandler, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';

import { PollInput } from '@/types/poll';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/Button';
import DoubleTextInput from '@/components/DoubleTextInput';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { Toggle } from '@/components/Toggle';

export default function CreatePollPage() {
  return <PollForm />;
}

const MIN_CHOICE_COUNT = 2;
const MAX_CHOICE_COUNT = 5;

const MAX_POLL_TITLE_LENGTH = 100;
const MAX_POLL_DESCRIPTION_LENGTH = 200;
const MAX_CHOICE_TITLE_LENGTH = 100;
const MAX_CHOICE_DESCRIPTION_LENGTH = 200;

const pollFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력하세요.' })
    .min(3, { message: '제목은 최소 3자 이상이어야 합니다.' }),
  description: z.string(),
  choices: z.array(
    z.object({
      main: z.string().min(1, { message: '보기를 입력하세요.' }),
      sub: z.string(),
    })
  ),
});

function PollForm() {
  const { toast } = useToast();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PollInput>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: '',
      description: '',
      choices: [
        {
          main: '',
          sub: '',
        },
        {
          main: '',
          sub: '',
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

  const [expanded, setExanded] = useState(false);

  const handleAddChoice = () => {
    if (fields.length >= MAX_CHOICE_COUNT) return;
    append({
      main: '',
      sub: '',
    });
  };

  const { mutate: createPoll } = trpc.poll.add.useMutation({
    onSuccess() {
      toast.update({
        message: '투표가 생성되었습니다.',
        theme: 'success',
      });
    },
  });
  const onSubmit = (data: PollInput) => createPoll(data);

  const onInvalid: SubmitErrorHandler<PollInput> = (e) => {
    const message =
      e.title?.message ||
      e.description?.message ||
      e.choices?.find?.((item) => item?.main?.message)?.main?.message;

    message && toast.update({ message, theme: 'error' });
  };

  return (
    <div className="flex h-full flex-col">
      <header className="relative flex items-center justify-between p-3">
        <XIcon size="20" />
        <h1 className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2 font-bold">
          설문 만들기
        </h1>
        <Button size="sm" ghost onClick={handleSubmit(onSubmit, onInvalid)}>
          완료
        </Button>
      </header>
      <form
        className="flex flex-1 flex-col gap-2 overflow-auto px-3 pt-1"
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
              <span className="label-text text-xs font-medium">설명란</span>
              <Toggle
                theme="primary"
                size="xs"
                checked={expanded}
                onChange={(e) => setExanded(e.currentTarget.checked)}
              />
            </label>
          </div>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="relative">
            <DoubleTextInput
              main={
                <DoubleTextInput.Main
                  className="!pr-11"
                  placeholder={`보기 ${index + 1}`}
                  maxLength={MAX_CHOICE_TITLE_LENGTH}
                  {...register(`choices.${index}.main`)}
                />
              }
              sub={
                <DoubleTextInput.Sub
                  expanded={expanded}
                  placeholder={'보기에 대한 설명을 적어주세요'}
                  maxLength={MAX_CHOICE_DESCRIPTION_LENGTH}
                  {...register(`choices.${index}.sub`)}
                />
              }
              error={!!errors.choices?.[index]?.main?.message}
            />
            <button
              className="absolute right-1.5 top-2 p-1"
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
