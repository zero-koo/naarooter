import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import TextArea from '@/components/ui/TextArea';
import TextInput from '@/components/ui/TextInput';

import CommnunityDescription from '../CommunityDescription';
import CommunityFormLayout from './CommunityFormLayout';

// export type CommunityBaseFormProps = {
//   initialData: CommunityFormData & {
//     id?: string;
//   };
// };

type CommunityFormData = {
  name: string;
  description: string;
  topicIds: number[];
};

const communityBaseFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: '커뮤니티 이름은 최소 2글자 이상이어야 합니다.',
    })
    .max(10, {
      message: '커뮤니티 이름은 최대 10글자 이내이어야 합니다.',
    }),
  description: z
    .string()
    .min(2, {
      message: '커뮤니티 설명은 최소 2글자 이상이어야 합니다.',
    })
    .max(300, '커뮤니티 설명은 최대 300글자 이내이어야 합니다.'),
});

const communityTopicsFormSchema = z.object({
  topics: z
    .array(z.number())
    .min(1, { message: '최소 한개 이상의 주제를를 선택해주세요.' }),
});

type CommunityBaseFormProps = {
  onSubmit: (values: z.infer<typeof communityBaseFormSchema>) => void;
};

const CommunityBaseForm = ({ onSubmit }: CommunityBaseFormProps) => {
  const form = useForm<z.infer<typeof communityBaseFormSchema>>({
    resolver: zodResolver(communityBaseFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CommunityFormLayout
          header={<h1 className="px-2 text-2xl font-bold">기본 정보</h1>}
          body={
            <div className="flex gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>커뮤니티 이름</FormLabel>
                      <FormControl>
                        <TextInput
                          {...field}
                          placeholder="커뮤니티 이름"
                          outline
                          maxLength={10}
                          minLength={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>설명</FormLabel>
                      <FormControl>
                        <TextArea
                          {...field}
                          outline
                          maxLength={300}
                          placeholder="설명"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-40 py-6">
                <CommnunityDescription
                  name={form.getValues('name')}
                  description={form.getValues('description')}
                  numUsers={1}
                  topics={[]}
                />
              </div>
            </div>
          }
          footer={
            <>
              <Button type="submit">다음</Button>
            </>
          }
        ></CommunityFormLayout>
      </form>
    </Form>
  );
};

type CommunityTopicsFormProps = {
  onPrev: (values: z.infer<typeof communityTopicsFormSchema>) => void;
  onSubmit: (values: z.infer<typeof communityTopicsFormSchema>) => void;
};

const CommunityTopicsForm = ({
  onPrev,
  onSubmit,
}: CommunityTopicsFormProps) => {
  const form = useForm<z.infer<typeof communityTopicsFormSchema>>({
    resolver: zodResolver(communityTopicsFormSchema),
    defaultValues: {
      topics: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CommunityFormLayout
          header={<h1 className="px-2 text-2xl font-bold">커뮤니티 주제</h1>}
          body={
            <div className="flex gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormMessage />
                      <FormControl>
                        <CommunityTopicSelect
                          {...field}
                          topics={[
                            {
                              id: 1,
                              name: 'MBTI',
                            },
                            {
                              id: 2,
                              name: '친목',
                            },
                          ]}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          }
          footer={
            <>
              <Button onClick={() => onPrev(form.getValues())}>이전</Button>
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

type CommunityTopics = Array<{
  id: number;
  name: string;
}>;
function CommunityTopicSelect({
  topics,
  value,
  onChange,
}: {
  topics: CommunityTopics;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  return (
    <div>
      {topics.map((topic) => (
        <CommunityTopicItem
          key={topic.id}
          name={topic.name}
          selected={value.includes(topic.id)}
          onSelect={(selected) =>
            onChange(
              selected
                ? value.concat(topic.id)
                : value.filter((v) => v !== topic.id)
            )
          }
        />
      ))}
    </div>
  );
}

function CommunityTopicItem({
  name,
  selected,
  onSelect,
}: {
  name: string;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'cursor-pointer rounded-lg border p-1',
        selected && 'border-primary text-primary'
      )}
    >
      <input
        type="checkbox"
        className="appearance-none"
        checked={selected}
        onChange={(e) => {
          onSelect(e.target.checked);
        }}
      />
      <span>{name}</span>
    </label>
  );
}

export default CommunityTopicsForm;
