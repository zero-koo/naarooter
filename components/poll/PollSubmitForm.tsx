import Link from 'next/link';
import { trpc } from '@/client/trpcClient';
import { numberFormat } from '@/utils/format';

import type { Poll } from '@/types/poll';
import { useVote } from '@/hooks/useVote';

import PollChoiceItem from './PollChoiceItem';

type PollSubmitFormProps = Poll & {
  voteId: number | null;
  showLink?: boolean;
};

function PollSubmitForm({
  id,
  title,
  description,
  choices,
  voteId,
  showLink = false,
}: PollSubmitFormProps) {
  const { voteItems, isVoted, totalVoteCount, handleVote } = useVote(
    choices
      .map((choice) => ({
        id: choice.id,
        mainText: choice.main,
        subText: choice.sub ?? '',
        count: choice.voteCount,
        voted: choice.voted,
        index: choice.index,
      }))
      .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
  );

  const { mutate: createVote } = trpc.vote.add.useMutation();
  const { mutate: updateVote } = trpc.vote.update.useMutation();
  const { mutate: deleteVote } = trpc.vote.delete.useMutation();

  return (
    <div className={'bg-base-200 p-3'}>
      <div className={'p-1 text-lg font-semibold'}>{title}</div>
      {description.trim() && (
        <div className={'p-1 text-xs opacity-90'}>{description}</div>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {voteItems.map(({ id, mainText, subText, count, voted }, index) => (
          <PollChoiceItem
            id={index}
            key={index}
            mainText={mainText}
            subText={subText}
            isSelected={voted}
            showResult={isVoted}
            voteCountRate={(count / totalVoteCount) * 100}
            onClick={() => {
              handleVote(index);

              if (voteId === null) {
                createVote({
                  userId: 1,
                  choiceId: id,
                });
                return;
              }

              voted
                ? deleteVote({ id: voteId })
                : updateVote({
                    id: voteId,
                    userId: 1,
                    choiceId: id,
                  });
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex px-1 text-xs opacity-75">
        <div>{numberFormat(totalVoteCount)}명 투표</div>
        {showLink && (
          <Link className="ml-auto" href={`/poll/${id}`}>
            자세히 보기
          </Link>
        )}
      </div>
    </div>
  );
}

export default PollSubmitForm;
