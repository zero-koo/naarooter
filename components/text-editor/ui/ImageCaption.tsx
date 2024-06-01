import { useEffect, useRef } from 'react';

export const ImageCaption = ({
  hasCaption,
  initialValue,
  onChangeCaption,
  readonly,
}: {
  hasCaption: boolean;
  initialValue?: string;
  onChangeCaption?: (value: string) => void;
  readonly?: boolean;
}) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !initialValue ||
      !contentEditableRef.current ||
      contentEditableRef.current.textContent === initialValue
    )
      return;
    contentEditableRef.current.textContent = initialValue;
  }, [contentEditableRef, initialValue]);

  if (!hasCaption) return null;
  return (
    <div
      className="mt-1 px-0.5 text-xs font-semibold"
      ref={contentEditableRef}
      contentEditable={!readonly}
      suppressContentEditableWarning
      onInput={(e) => {
        onChangeCaption?.(e.currentTarget.innerHTML);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    />
  );
};
