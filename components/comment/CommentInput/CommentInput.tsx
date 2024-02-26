import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '../../Button';
import { Textarea } from '../../ui/textarea';
import { CommentContent } from '@/types/shared';

const CommentInput = ({
  initialText = '',
  focusOnMount = false,
  hideButtonsByDefault = false,
  onSave,
  onCancel,
}: {
  initialText?: CommentContent;
  focusOnMount?: boolean;
  hideButtonsByDefault?: boolean;
  onSave: (text: CommentContent) => Promise<void>;
  onCancel?: () => void;
}) => {
  const { register, watch, handleSubmit, setValue, formState, setFocus } =
    useForm({
      resolver: zodResolver(z.object({ text: z.string().trim().min(1) })),
      defaultValues: {
        text: initialText,
      },
    });

  useEffect(() => {
    if (!focusOnMount) return;
    setFocus('text');
  }, [focusOnMount, setFocus]);

  const [showButtons, setShowButtons] = useState(!hideButtonsByDefault);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <Textarea
        {...register('text')}
        rows={Math.min(watch('text').split('\n').length, 4)}
        className={cn(
          'w-full border-b border-base-content/60 bg-transparent py-1 px-0 focus-visible:border-base-content mb-1.5'
        )}
        placeholder="댓글 남기기"
        onFocus={() => setShowButtons(true)}
      />
      {showButtons && (
        <div className="flex justify-end gap-2">
          {!isSubmitting && (
            <Button
              size="xs"
              onClick={() => {
                onCancel?.();
                setValue('text', initialText);
                setShowButtons(false);
              }}
            >
              취소
            </Button>
          )}
          <Button
            theme="primary"
            size="xs"
            disabled={!formState.isValid || isSubmitting}
            onClick={handleSubmit(async ({ text }) => {
              setIsSubmitting(true);
              try {
                await onSave(text);
                setValue('text', '');
                setShowButtons(false);
              } finally {
                setIsSubmitting(false);
              }
            })}
          >
            저장
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
