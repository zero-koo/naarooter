import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";
import style from "./DoubleTextInput.module.css";

type DoubleTextInputProps = {
  main: React.ReactNode;
  sub: React.ReactNode;
};

function DoubleTextInput({ main, sub }: DoubleTextInputProps) {
  return (
    <div className={style.wrapper}>
      {main}
      <hr className={style.border} />
      {sub}
    </div>
  );
}

type MainInputProps = React.HTMLAttributes<HTMLInputElement>;

function MainInput(
  { ...restProps }: MainInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input type="text" ref={ref} className={style.main} {...restProps} />;
}

MainInput.displayName = "MainInput";

interface SubInputProps extends React.HTMLAttributes<HTMLInputElement> {
  expanded: boolean;
}

function SubInput(
  { expanded, ...restProps }: SubInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type="text"
      ref={ref}
      className={clsx(style.sub, { [style.expanded]: expanded })}
      disabled={!expanded}
      {...restProps}
    />
  );
}
SubInput.displayName = "SubInput";

DoubleTextInput.Main = forwardRef(MainInput);
DoubleTextInput.Sub = forwardRef(SubInput);

export default DoubleTextInput;
