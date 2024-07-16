import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

export interface PollChoiceItemComponentProps {
  mainText: string;
  imageUrl?: string;
  voteCountRate: number;
  showResult: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function PollChoiceItem({
  mainText,
  imageUrl,
  voteCountRate,
  showResult,
  isSelected,
  onClick,
}: PollChoiceItemComponentProps) {
  return (
    <button
      className={cn(
        'group relative flex items-center overflow-hidden rounded-lg border border-neutral-content text-start transition-all hover:bg-neutral/40',
        {
          'border-primary outline outline-2 outline-offset-1 outline-primary':
            isSelected,
          'h-14': imageUrl,
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {imageUrl ? (
        <div className="h-full w-14">
          <Image
            width={60}
            height={60}
            src={imageUrl}
            alt={mainText}
            className="size-full object-cover"
          />
        </div>
      ) : null}
      <div className="relative flex h-full flex-1 items-center px-2.5 py-1.5">
        {showResult && (
          <div
            className={twMerge(
              'absolute inset-y-0 left-0 bg-neutral-content/10 transition-[width]',
              isSelected && 'bg-primary/30'
            )}
            style={{ width: `${voteCountRate}%` }}
          />
        )}
        <div className="relative flex flex-1 items-center gap-2">
          <div className={'text-sm font-semibold'}>{mainText}</div>
          <div className="ml-auto flex min-h-[24px] w-11 shrink-0 justify-end">
            {showResult ? (
              <div className="font-bold">
                <span className="vert">{voteCountRate.toFixed(0)}</span>
                <span className="text-xs">%</span>
              </div>
            ) : (
              <CheckCircle2 size={22} />
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
