import { CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface PollChoiceItemComponentProps {
  mainText: string;
  subText: string;
  voteCountRate: number;
  showResult: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function PollChoiceItem({
  mainText,
  subText,
  voteCountRate,
  showResult,
  isSelected,
  onClick,
}: PollChoiceItemComponentProps) {
  return (
    <button
      className={twMerge(
        'group flex flex-1 rounded-lg border border-neutral-content px-2.5 py-1.5 text-start relative overflow-hidden hover:bg-neutral/40 transition-all',
        isSelected &&
          'border-primary outline outline-2 outline-primary outline-offset-1'
      )}
      onClick={onClick}
    >
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
        <div>
          <div className={'text-sm font-semibold'}>{mainText}</div>
          {subText?.trim() && (
            <div className={'mb-0.5 mt-1 text-xs opacity-80'}>{subText}</div>
          )}
        </div>
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
    </button>
  );
}
