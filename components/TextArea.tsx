import { Size, Theme } from "@/types/style";
import clsx from "clsx";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  theme?: Theme;
  size?: Size;
  ghost?: boolean;
  noBorder?: boolean;
}

export default function TextArea({
  theme = "neutral",
  size = "md",
  ghost = false,
  noBorder = false,
  className,
  ...restProps
}: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        "textarea",
        {
          "border-neutral focus:border-primary focus:outline-primary":
            theme === "neutral",
          "textarea-primary": theme === "primary",
          "textarea-secondary": theme === "secondary",
          "textarea-accent": theme === "accent",
          "textarea-info": theme === "info",
          "textarea-success": theme === "success",
          "textarea-warning": theme === "warning",
          "textarea-error": theme === "error",
          "textarea-ghost": ghost,
          "textarea-bordered": !noBorder,
          "textarea-lg": size === "lg",
          "textarea-md": size === "md",
          "textarea-sm": size === "sm",
          "textarea-xs": size === "xs",
        },
        className
      )}
      {...restProps}
    />
  );
}
