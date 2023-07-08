import { Size, Theme } from "@/types/style";
import clsx from "clsx";

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  size?: Size;
  ghost?: boolean;
  noBorder?: boolean;
}

export default function TextInput({
  theme = "neutral",
  size = "md",
  ghost = false,
  noBorder = false,
  className,
  ...restProps
}: TextInputProps) {
  return (
    <input
      type="text"
      className={clsx(
        "input",
        {
          "border-neutral focus:border-primary focus:outline-primary":
            theme === "neutral",
          "input-primary": theme === "primary",
          "input-secondary": theme === "secondary",
          "input-accent": theme === "accent",
          "input-info": theme === "info",
          "input-success": theme === "success",
          "input-warning": theme === "warning",
          "input-error": theme === "error",
          "input-ghost": ghost,
          "input-bordered": !noBorder,
          "input-lg": size === "lg",
          "input-md": size === "md",
          "input-sm": size === "sm",
          "input-xs": size === "xs",
        },
        className
      )}
      {...restProps}
    />
  );
}
