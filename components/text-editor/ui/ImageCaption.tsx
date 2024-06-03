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

  const prevHasCaption = useRef<boolean>(hasCaption);
  useEffect(() => {
    if (prevHasCaption.current === hasCaption) return;

    // Need to Debug
    setTimeout(() => contentEditableRef.current?.focus(), 100);
  }, [hasCaption]);

  useEffect(() => {
    prevHasCaption.current = hasCaption;
  }, [hasCaption]);

  if (!hasCaption) return null;
  return (
    <div className="relative">
      <div
        className="mt-1 px-0.5 text-xs font-semibold empty:before:opacity-50 empty:before:content-['캡션을_입력하세요']"
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
    </div>
  );
};
