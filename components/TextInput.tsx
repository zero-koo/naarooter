import { Size, Theme } from '@/types/style';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  size?: Size;
  ghost?: boolean;
  noBorder?: boolean;
  error?: boolean;
  flat?: boolean;
}

function TextInput(
  {
    theme = 'neutral',
    size = 'md',
    ghost = false,
    noBorder = false,
    flat = false,
    error,
    className,
    ...restProps
  }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type="text"
      ref={ref}
      className={clsx(
        'input',
        {
          'border-neutral focus:border-primary focus:outline-primary':
            theme === 'neutral',
          'input-primary': theme === 'primary',
          'input-secondary': theme === 'secondary',
          'input-accent': theme === 'accent',
          'input-info': theme === 'info',
          'input-success': theme === 'success',
          'input-warning': theme === 'warning',
          '!input-error': theme === 'error' || error,
          'input-ghost border-none': ghost,
          'input-bordered': !noBorder,
          'input-lg': size === 'lg',
          'input-md': size === 'md',
          'input-sm': size === 'sm',
          'input-xs': size === 'xs',
          'rounded-none': flat,
        },
        className
      )}
      {...restProps}
    />
  );
}

export default forwardRef(TextInput);
