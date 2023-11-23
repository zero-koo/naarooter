import { trpc } from '@/client/trpcClient';

import {
  usePollQuery,
  useUpdatePollQueryData,
} from '@/hooks/queries/usePollQuery';
import { useToast } from '@/hooks/useToast';

import PollSubmitFormComponent from './PollSubmitForm.component';

type PollSubmitFormProps = {
  id: string;
  showLink?: boolean;
};

function PollSubmitForm({ id, showLink = false }: PollSubmitFormProps) {
  const { data } = usePollQuery(id);
  const { title, description, choices, voted } = data;
  const totalVoteCount = choices.reduce(
    (count, item) => count + item.voteCount,
    0
  );

  const updatePoll = useUpdatePollQueryData(id);

  const { toast } = useToast();

  const { mutate: createVote } = trpc.vote.vote.useMutation({
    onSuccess(voteData) {
      // Delete
      if (!voteData) {
        updatePoll({
          ...data,
          choices: choices.map((choice) => ({
            ...choice,
            selected: false,
            voteCount: choice.selected
              ? choice.voteCount - 1
              : choice.voteCount,
          })),
        });
        return;
      }

      const { pollChoiceId } = voteData;
      updatePoll({
        ...data,
        choices: choices.map((choice) => ({
          ...choice,
          selected: pollChoiceId === choice.id,
          voteCount:
            pollChoiceId === choice.id
              ? choice.voteCount + 1
              : choice.selected
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

  return (
    <PollSubmitFormComponent
      id={id}
      title={title}
      description={description?.toString() ?? ''}
      choices={choices}
      totalVoteCount={totalVoteCount}
      showResult={voted}
      showLink={showLink}
      onSelectChoice={(choiceId) =>
        createVote({
          pollId: id,
          choiceId,
        })
      }
    />
  );
}

export default PollSubmitForm;
