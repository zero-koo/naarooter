'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Quiz } from '@/types/quiz';
import { Button } from '@/components/Button';
import QuizChoiceItem from '@/components/QuizChoiceItem';

const quizes: Quiz[] = [
  {
    id: 'ab',
    title: '다음 중 치악력(턱힘)이 가장 약한 동물은?',
    choices: [
      {
        main: '악어',
      },
      {
        main: '백상아리',
      },
      {
        main: '하마',
      },
      {
        main: '하이에나',
      },
      {
        main: '북극곰',
      },
    ],
    answer: '1',
    explanation: `치악력 평균 (단위: PSI)\n(나일)악어 - 5000\n하마 - 1821\n북극곰 - 1235\n하이에나 - 1100\n백상아리 - 669`,
    submittedAnswer: null,
  },
  {
    id: 'aabb',
    title: '평균 크기가 가장 작은 동물은 ?',
    description: '고양이과 맹수',
    choices: [
      {
        main: '사자',
      },
      {
        main: '호랑이',
      },
      {
        main: '표범',
      },
      {
        main: '치타',
      },
      {
        main: '재규어',
      },
    ],
    answer: '3',
    explanation: '호랑이 > 사자 > 재규어 > 표범 > 치타',
    submittedAnswer: '3',
  },
  {
    id: 'aaabbb',
    title: '다음 중 개체수가 가장 적은 동물은?',
    choices: [
      {
        main: '사자',
      },
      {
        main: '호랑이',
      },
      {
        main: '표범',
      },
      {
        main: '치타',
      },
      {
        main: '재규어',
      },
    ],
    answer: '3',
    submittedAnswer: null,
  },
];

export default function QuizPage() {
  return (
    <div className="flex flex-col gap-2 bg-base-300">
      {quizes.map((quiz) => (
        <QuizItemTemplate key={quiz.id} {...quiz} />
      ))}
    </div>
  );
}

type QuizShowTemplateProps = Quiz;

function QuizItemTemplate({
  id,
  title,
  description,
  choices,
  answer,
  explanation,
  submittedAnswer,
}: QuizShowTemplateProps) {
  const { register, handleSubmit, watch } = useForm<{
    [key in `${string}-selectedAnswer`]: string | null;
  }>({
    defaultValues: {
      [`${id}-selectedAnswer`]: submittedAnswer,
    },
  });
  const selectedAnswer = watch(`${id}-selectedAnswer`);

  const [isSubmitted, setIsSubmitted] = useState(submittedAnswer !== null);
  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col bg-base-200 p-3">
      <h1 className="text-md mb-1 font-medium">Q. {title}</h1>
      <div className="mb-2 text-sm opacity-80">{description}</div>
      <div className="mb-2 flex flex-col gap-1.5">
        {choices.map((choice, index) => (
          <QuizChoiceItem
            {...register(`${id}-selectedAnswer`)}
            key={index}
            index={index}
            main={choice.main}
            sub={choice.sub}
            isAnswer={index === Number(answer)}
            isSelected={isSubmitted && Number(selectedAnswer) == index}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
      {!isSubmitted && (
        <Button
          block
          disabled={selectedAnswer === null}
          onClick={handleSubmit(onSubmit)}
        >
          제출
        </Button>
      )}
      {isSubmitted && explanation?.trim() && (
        <div className="mt-1 whitespace-pre-line border-t border-neutral px-0.5 py-2 text-sm leading-relaxed opacity-90">
          {explanation}
        </div>
      )}
    </div>
  );
}
