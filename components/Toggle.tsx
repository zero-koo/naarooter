import React from "react";
import clsx from "clsx";
import { Size, Theme } from "@/types/style";

interface ToggleProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
}

export function Toggle({
  theme = "neutral",
  size = "sm",
  className,
  ...rest
}: ToggleProps) {
  return (
    <input
      type="checkbox"
      className={clsx(
        "toggle",
        {
          "toggle-primary": theme === "primary",
          "toggle-secondary": theme === "secondary",
          "toggle-accent": theme === "accent",
          "toggle-info": theme === "info",
          "toggle-success": theme === "success",
          "toggle-warning": theme === "warning",
          "toggle-error": theme === "error",
          "toggle-lg": size === "lg",
          "toggle-md": size === "md",
          "toggle-sm": size === "sm",
          "toggle-xs": size === "xs",
        },
        className
      )}
      {...rest}
    />
  );
}
