'use client';

import { twMerge } from 'tailwind-merge';
import style from './QuizChoiceItem.module.css';
import { ForwardedRef, forwardRef } from 'react';

interface QuizChoiceItemProps extends React.HTMLAttributes<HTMLInputElement> {
  main: string;
  sub?: string;
  index: number;
  isSubmitted: boolean;
  isSelected: boolean;
  isAnswer: boolean;
}

export default forwardRef(function QuizChoiceItem(
  {
    main,
    sub,
    index,
    isSubmitted,
    isSelected,
    isAnswer,
    ...restProps
  }: QuizChoiceItemProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <label
      className={twMerge(
        style.item,
        isSubmitted && 'pointer-events-none opacity-80',
        isSubmitted && isSelected && isAnswer && style.correct,
        isSubmitted && isSelected && !isAnswer && style.wrong
      )}
    >
      <input
        ref={ref}
        type="radio"
        className="absolute h-0 w-0 opacity-0"
        disabled={isSubmitted}
        value={index}
        {...restProps}
      />
      <div className="mb-0.5 text-sm font-semibold">{main}</div>
      <div className="text-xs opacity-80">{sub}</div>
    </label>
  );
});
