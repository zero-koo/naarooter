import React, { ForwardedRef, forwardRef } from "react";
import clsx from "clsx";
import { Size, Theme } from "@/types/style";

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  value: string | number;
  name?: string;
}

function RadioInput(
  {
    theme = "neutral",
    size = "sm",
    className,
    name,
    value,
    ...rest
  }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type="radio"
      ref={ref}
      className={clsx(
        "radio",
        {
          "radio-primary": theme === "primary",
          "radio-secondary": theme === "secondary",
          "radio-accent": theme === "accent",
          "radio-info": theme === "info",
          "radio-success": theme === "success",
          "radio-warning": theme === "warning",
          "radio-error": theme === "error",
          "radio-lg": size === "lg",
          "radio-md": size === "md",
          "radio-sm": size === "sm",
          "radio-xs": size === "xs",
        },
        className
      )}
      name={name}
      value={value}
      {...rest}
    />
  );
}

export default forwardRef(RadioInput);
