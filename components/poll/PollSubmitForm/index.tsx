import { usePostContext } from '@/contexts/PostContext';
import { api } from '@/trpc/react';

import {
  usePollQuery,
  useUpdatePollQueryData,
} from '@/hooks/queries/usePollQuery';
import { usePostReaction } from '@/hooks/usePostReaction';
import { useToast } from '@/hooks/useToast';
import ReactionButton from '@/components/ReactionButton';

import PollSubmitFormComponent from './PollSubmitForm.component';

function PollSubmitForm() {
  const { id } = usePostContext();
  const [poll] = usePollQuery(id);
  const { title, description, images, choices, voted } = poll;
  const totalVoteCount = choices.reduce(
    (count, item) => count + item.voteCount,
    0
  );

  const updatePoll = useUpdatePollQueryData(id);

  const { toast } = useToast();

  const { mutate: createVote } = api.vote.vote.useMutation({
    onSuccess(voteData) {
      // Delete
      if (!voteData) {
        updatePoll({
          ...poll,
          voted: false,
          choices: choices.map((choice) => ({
            ...choice,
            voted: false,
            voteCount: choice.voted ? choice.voteCount - 1 : choice.voteCount,
          })),
        });
        return;
      }

      const { pollChoiceId } = voteData;
      updatePoll({
        ...poll,
        voted: true,
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

  const postReaction = usePostReaction(id);

  return (
    <PollSubmitFormComponent
      id={id}
      title={title}
      description={description?.toString() ?? ''}
      images={images}
      choices={choices}
      totalVoteCount={totalVoteCount}
      showResult={voted}
      onSelectChoice={(choiceId) =>
        createVote({
          pollId: poll.pollId,
          choiceId,
        })
      }
      footerRight={<ReactionButton {...postReaction} />}
    />
  );
}

export default PollSubmitForm;
