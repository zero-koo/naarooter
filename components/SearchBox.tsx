'use client';

import { useEffect, useState } from 'react';
import { DeleteIcon, SearchIcon, Undo2Icon, XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { useOutsideClick } from '@/hooks/useClickOutside';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';

type SearchBoxProps = {
  className?: string;
  onSubmit?: (value: string) => void;
};

const SearchBox = ({ className, onSubmit }: SearchBoxProps) => {
  const { getSearchParams, deleteSearchParams } = useURLSearchParams();
  const search = getSearchParams('search');

  const [extended, setExtended] = useState(!!search);

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
          submittedValue={search ?? ''}
          onSubmit={(value) => {
            onSubmit?.(value);
          }}
          onRevert={() => {
            deleteSearchParams('search');
          }}
          onClickOutside={() => search || setExtended(false)}
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
  submittedValue,
  className,
  onSubmit,
  onRevert,
  onClickOutside,
}: {
  submittedValue?: string;
  className?: string;
  onSubmit?: (value: string) => void;
  onRevert?: () => void;
  onClickOutside?: () => void;
}) {
  const { register, watch, setValue, setFocus, handleSubmit } = useForm<{
    value: string;
  }>({
    defaultValues: {
      value: submittedValue ?? '',
    },
  });

  useEffect(() => {
    setFocus('value');
  }, [setFocus]);

  const elementRef = useOutsideClick<HTMLFormElement>(() => {
    onClickOutside?.();
  });

  return (
    <form ref={elementRef} className={cn('flex h-8 flex-1', className)}>
      <div
        className={cn(
          'flex h-full flex-1 items-center gap-1.5 pl-4 pr-2 text-sm'
        )}
      >
        <input
          {...register('value')}
          className={'size-full'}
          placeholder="검색"
          autoComplete={'off'}
        />
        {submittedValue || watch('value') ? (
          <button
            className="flex-center size-fit rounded-full bg-neutral-100/20 p-0.5"
            type="button"
            onClick={() => {
              setValue('value', '');
              setFocus('value');
              submittedValue && onRevert?.();
            }}
          >
            <XIcon size={12} />
          </button>
        ) : null}
      </div>
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
