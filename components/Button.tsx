import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "lg" | "md" | "sm" | "xs";
  ghost?: boolean;
  outline?: boolean;
  link?: boolean;
  glass?: boolean;
  wide?: boolean;
  block?: boolean;
  circle?: boolean;
  square?: boolean;
  active?: boolean;
  disabled?: boolean;
}

export function Button({
  theme = "neutral",
  size = "sm",
  ghost = false,
  outline = false,
  glass = false,
  link = false,
  wide = false,
  block = false,
  circle = false,
  square = false,
  active = false,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={clsx("btn", {
        "btn-neutral": theme === "neutral",
        "btn-primary": theme === "primary",
        "btn-secondary": theme === "secondary",
        "btn-accent": theme === "accent",
        "btn-info": theme === "info",
        "btn-success": theme === "success",
        "btn-warning": theme === "warning",
        "btn-error": theme === "error",
        "btn-lg": size === "lg",
        "btn-md": size === "md",
        "btn-sm": size === "sm",
        "btn-xs": size === "xs",
        "btn-block": block,
        "btn-ghost": ghost,
        "btn-link": link,
        "btn-outline": outline,
        "btn-wide": wide,
        "btn-square": square,
        "btn-circle": circle,
        "btn-active": active,
        "btn-disabled": disabled,
        glass: glass,
      })}
    >
      Button
    </button>
  );
}
