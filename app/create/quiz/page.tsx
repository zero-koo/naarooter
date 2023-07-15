"use client";

import DoubleTextInput from "@/components/DoubleTextInput";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MinusCircle, PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { Toggle } from "@/components/Toggle";
import RadioInput from "@/components/RadioInput";
import { Quiz as QuizInput } from "@/types/quiz";

export default function CreateQuizPage() {
  return <QuizForm />;
}

const MIN_CHOICE_COUNT = 2;
const MAX_CHOICE_COUNT = 5;

function QuizForm() {
  const { control, register, handleSubmit } = useForm<QuizInput>({
    defaultValues: {
      title: "",
      description: "",
      choices: [
        {
          main: "",
          sub: "",
        },
        {
          main: "",
          sub: "",
        },
      ],
      explanation: "",
      answer: "1",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
    rules: {
      minLength: 2,
      maxLength: 5,
    },
  });

  const [expanded, setExanded] = useState(false);

  const handleAddChoice = () => {
    if (fields.length >= MAX_CHOICE_COUNT) return;
    append({
      main: "",
      sub: "",
    });
  };

  const onSubmit = (data: QuizInput) => {
    try {
      console.log({
        ...data,
        choices: expanded
          ? data.choices
          : data.choices.map((choice) => ({
              ...choice,
              sub: "",
            })),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="relative flex items-center justify-between p-3">
        <XIcon size="20" />
        <h1 className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2 font-bold">
          퀴즈 만들기
        </h1>
        <Button size="sm" ghost onClick={handleSubmit(onSubmit)}>
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
          {...register("title", {
            validate: (value) => value.trim().length > 1,
          })}
        />
        <TextArea
          size="xs"
          className="shrink-0 p-3"
          placeholder="내용을 적어주세요"
          {...register("description")}
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
                  className="!px-11"
                  placeholder={`항목 ${index + 1}`}
                  {...register(`choices.${index}.main`, {
                    validate: (value) => value.trim().length > 1,
                  })}
                />
              }
              sub={
                <DoubleTextInput.Sub
                  expanded={expanded}
                  placeholder={"항목에 대한 설명을 적어주세요"}
                  {...register(`choices.${index}.sub`)}
                />
              }
            />
            <RadioInput
              value={index + 1}
              {...register("answer")}
              className="!absolute left-3 top-3.5"
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
          항목 추가
        </Button>
        <TextArea
          {...register("explanation")}
          size="xs"
          className="mt-2 min-h-[200px] p-3"
          placeholder="정답에 대한 설명을 적어주세요"
        />
      </form>
    </div>
  );
}
