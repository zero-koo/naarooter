'use client';

import { useOutsideClick } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type SearchBoxProps = {
  className?: string;
  onSubmit?: (value: string) => void;
};

const SearchBox = ({ className, onSubmit }: SearchBoxProps) => {
  const [extended, setExtended] = useState(false);

  return (
    <div
      className={cn(
        'rounded-full border border-neutral-100/10',
        {
          'flex-1': extended,
        },
        className
      )}
    >
      {extended ? (
        <SearchBoxInput
          onSubmit={(value) => {
            setExtended(false);
            onSubmit?.(value);
          }}
          onClickOutside={() => setExtended(false)}
        />
      ) : (
        <button
          className="flex h-8 items-center gap-2 pl-2.5 pr-3"
          onClick={() => setExtended(true)}
        >
          <SearchIcon size={16} />
          <div className="text-xs">검색</div>
        </button>
      )}
    </div>
  );
};

export default SearchBox;

function SearchBoxInput({
  className,
  onSubmit,
  onClickOutside,
}: {
  className?: string;
  onSubmit?: (value: string) => void;
  onClickOutside?: () => void;
}) {
  const { register, setFocus, handleSubmit } = useForm<{
    value: string;
  }>();

  useEffect(() => {
    setFocus('value');
  }, [setFocus]);

  const elementRef = useOutsideClick<HTMLFormElement>(() => {
    onClickOutside?.();
  });

  return (
    <form ref={elementRef} className={cn('flex h-8 flex-1', className)}>
      <input
        {...register('value')}
        className="h-full flex-1 pl-4 pr-1 text-sm"
        placeholder="검색"
        autoComplete={'off'}
      />
      <button
        className="flex-center h-full rounded-e-full bg-neutral-100/10 px-2 pr-2.5"
        onClick={handleSubmit(({ value }) => {
          onSubmit?.(value);
        })}
      >
        <SearchIcon size={16} />
      </button>
    </form>
  );
}
