import Link from 'next/link';
import { trpc } from '@/client/trpcClient';
import { numberFormat } from '@/utils/format';

import {
  usePollQuery,
  useUpdatePollQueryData,
} from '@/hooks/queries/usePollQuery';
import { useToast } from '@/hooks/useToast';

import PollChoiceItem from './PollChoiceItem';

type PollSubmitFormProps = {
  id: string;
  showLink?: boolean;
};

function PollSubmitForm({ id, showLink = false }: PollSubmitFormProps) {
  const { data } = usePollQuery(id);
  const { title, description, choices, voteId } = data;
  const totalVoteCount = choices.reduce(
    (count, item) => count + item.voteCount,
    0
  );

  const updatePoll = useUpdatePollQueryData(id);

  const { toast } = useToast();

  const { mutate: createVote } = trpc.vote.add.useMutation({
    onSuccess({ id: voteId, pollChoiceId }) {
      updatePoll({
        ...data,
        voteId,
        choices: choices.map((choice) => ({
          ...choice,
          voted: pollChoiceId === choice.id,
          voteCount:
            pollChoiceId === choice.id
              ? choice.voteCount + 1
              : choice.voteCount,
        })),
      });
    },
    onError() {
      toast.update({
        theme: 'error',
        message: '투표 내용이 저장되지 않았습니다.',
      });
    },
  });
  const { mutate: updateVote } = trpc.vote.update.useMutation({
    onSuccess({ id: voteId, pollChoiceId }) {
      updatePoll({
        ...data,
        voteId,
        choices: choices.map((choice) => ({
          ...choice,
          voted: pollChoiceId === choice.id,
          voteCount:
            pollChoiceId === choice.id
              ? choice.voteCount + 1
              : choice.voted
              ? choice.voteCount - 1
              : choice.voteCount,
        })),
      });
    },
    onError() {
      toast.update({
        theme: 'error',
        message: '투표 내용이 저장되지 않았습니다.',
      });
    },
  });
  const { mutate: deleteVote } = trpc.vote.delete.useMutation({
    onSuccess() {
      updatePoll({
        ...data,
        voteId: undefined,
        choices: choices.map((choice) => ({
          ...choice,
          voted: false,
          voteCount: choice.voted ? choice.voteCount - 1 : choice.voteCount,
        })),
      });
    },
    onError() {
      toast.update({
        theme: 'error',
        message: '투표 내용이 저장되지 않았습니다.',
      });
    },
  });

  return (
    <div className={'bg-base-200 p-3'}>
      <div className={'p-1 text-lg font-semibold'}>{title}</div>
      {description.trim() && (
        <div className={'p-1 text-xs opacity-90'}>{description}</div>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {choices
          .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
          .map(({ id, main, sub, voteCount, voted }, index) => (
            <PollChoiceItem
              id={index}
              key={index}
              mainText={main}
              subText={sub}
              isSelected={voted}
              showResult={!!voteId}
              voteCountRate={(voteCount / totalVoteCount) * 100}
              onClick={() => {
                if (voteId === undefined) {
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
