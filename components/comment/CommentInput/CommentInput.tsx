import { useEffect, useState } from 'react';
import { CommentContent } from '@/types/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '../../ui/Button';
import Textarea from '../../ui/TextArea';
import CommentTargetUserTag from '../CommentTargetUserTag';

const CommentInput = ({
  initialText = '',
  focusOnMount = false,
  hideButtonsByDefault = false,
  targetUserName,
  onSave,
  onCancel,
}: {
  initialText?: CommentContent;
  focusOnMount?: boolean;
  hideButtonsByDefault?: boolean;
  targetUserName?: string | null;
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
      {targetUserName && (
        <CommentTargetUserTag username={targetUserName} className="mb-1" />
      )}
      <Textarea
        {...register('text')}
        rows={Math.min(watch('text').split('\n').length, 4)}
        className={cn(
          'mb-1.5 w-full border-b border-base-content/60 bg-transparent px-0 py-0 pb-1 focus-visible:border-base-content'
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
            variant="primary"
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
