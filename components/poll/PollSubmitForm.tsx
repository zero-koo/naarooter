import { numberFormat } from '@/utils/format';

import type { Poll } from '@/types/poll';
import { useVote } from '@/hooks/useVote';

import PollChoiceItem from './PollChoiceItem';

type PollSubmitFormProps = Poll;

function PollSubmitForm({
  title,
  description,
  choices,
  submittedAnswerIndex,
}: PollSubmitFormProps) {
  const { voteItems, isVoted, totalVoteCount, handleVote } = useVote(
    choices
      .map((choice) => ({
        mainText: choice.main,
        subText: choice.sub ?? '',
        count: choice.voteCount,
        voted: submittedAnswerIndex === choice.index,
        index: choice.index,
      }))
      .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
  );

  return (
    <div className={'p-3'}>
      <div className={'p-1 text-lg font-semibold'}>{title}</div>
      {description.trim() && (
        <div className={'p-1 text-xs opacity-90'}>{description}</div>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {voteItems.map(({ mainText, subText, count, voted }, index) => (
          <PollChoiceItem
            id={index}
            key={index}
            mainText={mainText}
            subText={subText}
            isSelected={voted}
            showResult={isVoted}
            voteCountRate={(count / totalVoteCount) * 100}
            onClick={() => handleVote(index)}
          />
        ))}
      </div>
      <div className="mt-2 px-1 text-xs opacity-75">
        {numberFormat(totalVoteCount)}명 투표
      </div>
    </div>
  );
}

export default PollSubmitForm;
