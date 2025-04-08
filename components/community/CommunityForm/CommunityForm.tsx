'use client';

import { useEffect, useState } from 'react';
import {
  communityDescriptionSchema,
  communityNameSchema,
  communityTopicsSchema,
  MAX_COMMUNITY_DESCRIPTION_LENGTH,
  MAX_COMMUNITY_NAME_LENGTH,
  MIN_COMMUNITY_DESCRIPTION_LENGTH,
  MIN_COMMUNITY_NAME_LENGTH,
} from '@/schemas/community';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { SelectableLabel } from '@/components/ui/SelectableLabel';
import TextArea from '@/components/ui/TextArea';
import TextInput from '@/components/ui/TextInput';

import CommnunityDescription from '../CommunityDescription';
import CommunityFormLayout from './CommunityFormLayout';

const communityBaseFormSchema = z.object({
  name: communityNameSchema,
  description: communityDescriptionSchema,
});

const communityTopicsFormSchema = z.object({
  topics: communityTopicsSchema,
});

const communityFormSchema = communityBaseFormSchema.merge(
  communityTopicsFormSchema
);

export type CommunityFormData = z.infer<typeof communityFormSchema>;

type CommunityBaseFormProps = {
  initialData?: CommunityFormData;
  nameFieldDisabled?: boolean;
  onSubmit: (values: z.infer<typeof communityBaseFormSchema>) => void;
};

const CommunityForm = ({
  initialData,
  nameFieldDisabled,
  isSubmitting,
  onSubmit,
}: {
  initialData?: CommunityFormData;
  nameFieldDisabled?: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: CommunityFormData) => void;
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CommunityFormData>(
    initialData ?? {
      name: '',
      description: '',
      topics: [],
    }
  );

  const updateFormData = (values: Partial<CommunityFormData>) => {
    const updatedFormData = { ...formData, ...values };
    setFormData(updatedFormData);

    return updatedFormData;
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {step === 0 && (
        <CommunityBaseForm
          initialData={formData}
          nameFieldDisabled={nameFieldDisabled}
          onSubmit={(values) => {
            updateFormData(values);
            setStep(1);
          }}
        />
      )}
      {step === 1 && formData && (
        <CommunityTopicsForm
          isSubmitting={isSubmitting}
          initialData={formData}
          onPrev={(values) => {
            updateFormData(values);
            setStep(0);
          }}
          onSubmit={(values) => {
            const updatedFormData = updateFormData(values);

            onSubmit(updatedFormData);
          }}
        />
      )}
    </div>
  );
};

const CommunityBaseForm = ({
  initialData,
  nameFieldDisabled,
  onSubmit,
}: CommunityBaseFormProps) => {
  const form = useForm<z.infer<typeof communityBaseFormSchema>>({
    resolver: zodResolver(communityBaseFormSchema),
    defaultValues: initialData ?? {
      name: '',
      description: '',
    },
  });

  const name = form.watch('name');
  const description = form.watch('description');

  const [debouncedName] = useDebounce(name, 300);
  const { data: checkName } = api.community.checkName.useQuery(
    { name: debouncedName },
    { enabled: debouncedName.trim().length >= MIN_COMMUNITY_NAME_LENGTH }
  );

  useEffect(() => {
    if (nameFieldDisabled) return;
    if (checkName?.exist) {
      form.setError('name', {
        type: 'duplicate',
        message: '이미 사용중인 이름입니다.',
      });
    } else {
      form.clearErrors('name');
    }
  }, [nameFieldDisabled, checkName?.exist, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CommunityFormLayout
          header={<h1 className="px-1 text-xl font-bold">기본 정보</h1>}
          body={
            <div className="flex gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel className="mb-1 px-1">커뮤니티 이름</FormLabel>
                      <FormControl>
                        <TextInput
                          {...field}
                          placeholder="커뮤니티 이름"
                          disabled={nameFieldDisabled}
                          outline
                          minLength={MIN_COMMUNITY_NAME_LENGTH}
                          maxLength={MAX_COMMUNITY_NAME_LENGTH}
                        />
                      </FormControl>
                      <div className="mt-0.5 flex gap-2">
                        <FormMessage className="flex-1 px-1" />
                        <div className="ml-auto text-xs opacity-60">{`${name.length}/${MAX_COMMUNITY_NAME_LENGTH}`}</div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1 px-1">설명</FormLabel>
                      <FormControl>
                        <TextArea
                          {...field}
                          outline
                          minLength={MIN_COMMUNITY_DESCRIPTION_LENGTH}
                          maxLength={MAX_COMMUNITY_DESCRIPTION_LENGTH}
                          placeholder="설명"
                          className="h-32"
                        />
                      </FormControl>
                      <div className="mt-0.5 flex gap-2">
                        <FormMessage className="flex-1 px-1" />
                        <div className="ml-auto text-xs opacity-60">{`${description.length}/${MAX_COMMUNITY_DESCRIPTION_LENGTH}`}</div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="hidden w-40 md:block">
                <CommnunityDescription
                  name={name}
                  description={description}
                  numUsers={1}
                  topics={initialData?.topics.map((topic) => topic.name) ?? []}
                />
              </div>
            </div>
          }
          footer={
            <>
              <Button type="submit" disabled={!form.formState.isValid}>
                다음
              </Button>
            </>
          }
        ></CommunityFormLayout>
      </form>
    </Form>
  );
};

type CommunityTopicsFormProps = {
  initialData: CommunityFormData;
  isSubmitting?: boolean;
  onPrev: (values: z.infer<typeof communityTopicsFormSchema>) => void;
  onSubmit: (values: z.infer<typeof communityTopicsFormSchema>) => void;
};

const CommunityTopicsForm = ({
  initialData,
  isSubmitting,
  onPrev,
  onSubmit,
}: CommunityTopicsFormProps) => {
  const { data: topicList } = api.community.topics.useQuery();

  const form = useForm<z.infer<typeof communityTopicsFormSchema>>({
    resolver: zodResolver(communityTopicsFormSchema),
    defaultValues: {
      topics: initialData.topics ?? [],
    },
  });

  const selectedTopics = form.watch('topics');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CommunityFormLayout
          header={<h1 className="px-1 text-xl font-bold">관련 주제</h1>}
          body={
            <div className="flex gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="topics"
                  render={() => (
                    <FormItem className="mb-3">
                      <div className="mb-3">
                        <h3 className="mb-1 flex items-center gap-1.5 px-1 text-base font-semibold">
                          <span>선택</span>
                          <span className={'text-tabular-nums'}>
                            {`${selectedTopics.length} / 3`}
                          </span>
                        </h3>
                        <FormMessage />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {topicList?.topics.map((topic) => (
                          <FormField
                            key={topic.id}
                            control={form.control}
                            name="topics"
                            render={({ field }) => {
                              const selected = field.value.some(
                                (v) => v.id === topic.id
                              );
                              return (
                                <FormControl>
                                  <CommunityTopicItem
                                    name={topic.name}
                                    selected={selected}
                                    disabled={
                                      selectedTopics.length >= 3 && !selected
                                    }
                                    onSelect={(selected) =>
                                      selected
                                        ? field.onChange([
                                            ...field.value,
                                            topic,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value.id !== topic.id
                                            )
                                          )
                                    }
                                  />
                                </FormControl>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="hidden w-40 md:block">
                <CommnunityDescription
                  name={initialData.name}
                  description={initialData.description}
                  numUsers={1}
                  topics={selectedTopics.map((topic) => topic.name)}
                />
              </div>
            </div>
          }
          footer={
            <>
              <Button
                disabled={isSubmitting}
                onClick={() => onPrev(form.getValues())}
              >
                이전
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid || isSubmitting}
              >
                다음
              </Button>
            </>
          }
        ></CommunityFormLayout>
      </form>
    </Form>
  );
};

function CommunityTopicItem({
  name,
  selected,
  disabled,
  onClick,
  onSelect,
}: {
  name: string;
  selected: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onSelect: (selected: boolean) => void;
}) {
  return (
    <SelectableLabel
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      onSelect={onSelect}
    >
      {name}
    </SelectableLabel>
  );
}

export default CommunityForm;
