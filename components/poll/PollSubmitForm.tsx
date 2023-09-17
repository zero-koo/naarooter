import type { Poll } from '@/types/poll';
import PollChoiceItem from './PollChoiceItem';
import { useVote } from '@/hooks/useVote';
import { numberFormat } from '@/utils/format';

type PollSubmitFormProps = Poll;

function PollSubmitForm({
  title,
  description,
  choices,
  submittedAnswerIndex,
}: PollSubmitFormProps) {
  const { voteItems, isVoted, totalVoteCount, handleVote } = useVote(
    choices.map((choice, index) => ({
      mainText: choice.main,
      subText: choice.sub ?? '',
      count: choice.voteCount,
      voted: submittedAnswerIndex === index,
    }))
  );

  return (
    <div className={'p-3'}>
      <div className={'p-1 text-lg font-semibold'}>{title}</div>
      <div className={'p-1 text-xs opacity-90'}>{description}</div>
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
