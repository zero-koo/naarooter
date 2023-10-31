'use client';

import { Button } from '@/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const mbtiFormSchema = z.object({
  ei: z.enum(['E', 'I']),
  sn: z.enum(['S', 'N']),
  ft: z.enum(['F', 'T']),
  jp: z.enum(['J', 'P']),
});

type MbtiFormInput = z.infer<typeof mbtiFormSchema>;

interface MbtiSettingFormProps {
  initialData?: MbtiFormInput;
  isSaving?: boolean;
  onSave: (mbti: MbtiFormInput) => void;
}

const MbtiSettingForm = ({
  initialData,
  isSaving = false,
  onSave,
}: MbtiSettingFormProps) => {
  const method = useForm<MbtiFormInput>({
    resolver: zodResolver(mbtiFormSchema),
    defaultValues: initialData,
  });
  const { handleSubmit, formState, watch } = method;

  const mbti = watch(['ei', 'sn', 'ft', 'jp']).join(
    ''
  ) as keyof typeof mbtiTextMap;
  const mbtiText = mbti && mbtiTextMap[mbti];

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <FormProvider {...method}>
        <MBTIToggle
          id="ei"
          leftValue="E"
          leftText="외향"
          rightValue="I"
          rightText="내향"
        />
        <MBTIToggle
          id="sn"
          leftValue="S"
          leftText="감각"
          rightValue="N"
          rightText="직관"
        />
        <MBTIToggle
          id="ft"
          leftValue="F"
          leftText="감정"
          rightValue="T"
          rightText="사고"
        />
        <MBTIToggle
          id="jp"
          leftValue="J"
          leftText="판단"
          rightValue="P"
          rightText="인식"
        />
      </FormProvider>
      <div className="mt-2 flex w-full">
        {formState.isValid && (
          <div className="flex flex-1 items-center gap-2">
            <div className="text-sm font-semibold">{mbtiText},</div>
            <div className="text-lg font-bold">{mbti}</div>
          </div>
        )}
        <Button
          theme="primary"
          className="ml-auto"
          onClick={handleSubmit(onSave)}
          disabled={!formState.isValid || isSaving}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

const mbtiTextMap = {
  ESFJ: '사교적인 외교관',
  ISTJ: '청렴결백한 논리주의자',
  ISTP: '만능재주꾼',
  ESTP: '모험을 즐기는 사업가',
  ISFP: '호기심 많은 예술가',
  ESFP: '자유로운 영혼의 연예인',
  ISFJ: '용감한 수호자',
  ESTJ: '엄격한 관리자',
  ENFP: '재기발랄한 활동가',
  ENFJ: '정의로운 사회운동가',
  INFP: '열정적인 중재자',
  INFJ: '선의의 옹호자',
  ENTP: '뜨거운 논쟁을 즐기는 변론가',
  ENTJ: '대담한 통솔자',
  INTP: '논리적인 사색가',
  INTJ: '용의주도한 전략가',
};

export default MbtiSettingForm;

const MBTIToggle = ({
  id,
  leftValue,
  leftText,
  rightValue,
  rightText,
}: {
  id: keyof MbtiFormInput;
  leftValue: string;
  leftText: string;
  rightValue: string;
  rightText: string;
}) => {
  const { register } = useFormContext<MbtiFormInput>();
  return (
    <div className="border-1 relative z-0 flex w-full justify-between rounded-xl border-primary bg-primary/20">
      <label
        htmlFor={leftValue}
        className="z-10 flex h-[52px] w-1/2 cursor-pointer items-center justify-start gap-2.5 rounded p-1 text-primary-content/95"
      >
        <div className="justfiy-start flex h-full w-full items-center gap-2.5 rounded-lg bg-white/10 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-content/90 text-2xl font-bold text-primary">
            {leftValue}
          </div>
          <div className="text-sm font-bold tracking-wide opacity-70">
            {leftText}
          </div>
        </div>
      </label>
      <input
        type="radio"
        id={leftValue}
        value={leftValue}
        {...register(id)}
        name={id}
        className="peer/left appearance-none"
      />
      <label
        htmlFor={rightValue}
        className="z-10 flex h-[52px] w-1/2 cursor-pointer items-center justify-end gap-2.5 rounded p-1 text-primary-content/95"
      >
        <div className="flex h-full w-full items-center justify-end gap-2.5 rounded-lg bg-white/10 px-2">
          <div className="text-sm font-bold tracking-wide opacity-70">
            {rightText}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-content/90 text-2xl font-bold text-primary">
            {rightValue}
          </div>
        </div>
      </label>
      <input
        type="radio"
        id={rightValue}
        value={rightValue}
        {...register(id)}
        name={id}
        className="peer/right appearance-none"
      />
      <div className="absolute z-0 h-[52px] w-1/2 translate-x-1/2 p-1 opacity-0 transition-transform peer-checked/left:translate-x-0 peer-checked/right:translate-x-full peer-checked/left:opacity-100 peer-checked/right:opacity-100">
        <div className="h-full w-full rounded-lg bg-white/100"></div>
      </div>
    </div>
  );
};
