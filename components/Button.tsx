import React from 'react';
import { Size, Theme } from '@/types/style';
import clsx from 'clsx';

import Loading from './ui/Loading';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: Theme;
  size?: Size;
  LeftIcon?: React.FC<{ size?: number | string }>;
  RightIcon?: React.FC<{ size?: number | string }>;
  ghost?: boolean;
  outline?: boolean;
  link?: boolean;
  glass?: boolean;
  wide?: boolean;
  block?: boolean;
  circle?: boolean;
  square?: boolean;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  theme = 'neutral',
  size = 'sm',
  LeftIcon,
  RightIcon,
  ghost = false,
  outline = false,
  glass = false,
  link = false,
  wide = false,
  block = false,
  circle = false,
  square = false,
  active = false,
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'btn relative flex font-medium',
        {
          'btn-neutral': theme === 'neutral',
          'btn-primary': theme === 'primary',
          'btn-secondary': theme === 'secondary',
          'btn-accent': theme === 'accent',
          'btn-info': theme === 'info',
          'btn-success': theme === 'success',
          'btn-warning': theme === 'warning',
          'btn-error': theme === 'error',
          'btn-lg gap-3': size === 'lg',
          'btn-md gap-2': size === 'md',
          'btn-sm gap-1.5': size === 'sm',
          'btn-xs gap-1': size === 'xs',
          'btn-block': block,
          'btn-ghost': ghost,
          'btn-link': link,
          'btn-outline border-primary-content/20': outline,
          'btn-wide': wide,
          'btn-square': square,
          'btn-circle': circle,
          'btn-active': active,
          'btn-disabled': disabled || loading,
          'pl-4': !!LeftIcon && size === 'lg',
          'pl-3': !!LeftIcon && size === 'md',
          'pl-2': !!LeftIcon && size === 'sm',
          'pl-1': !!LeftIcon && size === 'xs',
          'pr-4': !!RightIcon && size === 'lg',
          'pr-3': !!RightIcon && size === 'md',
          'pr-2': !!RightIcon && size === 'sm',
          'pr-1': !!RightIcon && size === 'xs',
          glass: glass,
        },
        className
      )}
      {...rest}
    >
      <div
        className={clsx('flex items-center gap-1', {
          'opacity-0': loading,
        })}
      >
        {LeftIcon && <LeftIcon size={iconSizeMap[size]} />}
        {children}
        {RightIcon && <RightIcon size={iconSizeMap[size]} />}
      </div>
      {loading && (
        <div className="absolute-center">
          <Loading size="sm" />
        </div>
      )}
    </button>
  );
}

const iconSizeMap: Record<Size, number> = {
  lg: 26,
  md: 22,
  sm: 18,
  xs: 14,
};
