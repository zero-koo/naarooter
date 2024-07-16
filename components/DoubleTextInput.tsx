import { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import style from './DoubleTextInput.module.css';

type DoubleTextInputProps = {
  main: React.ReactNode;
  sub: React.ReactNode;
  error?: boolean;
};

function DoubleTextInput({ main, sub, error }: DoubleTextInputProps) {
  return (
    <div className={twMerge(style.wrapper, error && style.error)}>
      {main}
      <hr className={style.border} />
      {sub}
    </div>
  );
}

type MainInputProps = React.HTMLAttributes<HTMLInputElement>;

function MainInput(
  { className, ...restProps }: MainInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type="text"
      ref={ref}
      className={twMerge(style.main, className)}
      {...restProps}
    />
  );
}

MainInput.displayName = 'MainInput';

interface SubInputProps extends React.HTMLAttributes<HTMLInputElement> {
  expanded: boolean;
}

function SubInput(
  { expanded, className, ...restProps }: SubInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type="text"
      ref={ref}
      className={clsx(style.sub, { [style.expanded]: expanded }, className)}
      disabled={!expanded}
      {...restProps}
    />
  );
}
SubInput.displayName = 'SubInput';

DoubleTextInput.Main = forwardRef(MainInput);
DoubleTextInput.Sub = forwardRef(SubInput);

export default DoubleTextInput;
