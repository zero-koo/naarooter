import React from 'react';
import { Size, Theme } from '@/types/style';
import clsx from 'clsx';

interface ToggleProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ theme = 'neutral', size = 'sm', className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          'toggle',
          {
            'toggle-primary': theme === 'primary',
            'toggle-secondary': theme === 'secondary',
            'toggle-accent': theme === 'accent',
            'toggle-info': theme === 'info',
            'toggle-success': theme === 'success',
            'toggle-warning': theme === 'warning',
            'toggle-error': theme === 'error',
            'toggle-lg': size === 'lg',
            'toggle-md': size === 'md',
            'toggle-sm': size === 'sm',
            'toggle-xs': size === 'xs',
          },
          className
        )}
        {...rest}
      />
    );
  }
);

Toggle.displayName = 'Toggle';
