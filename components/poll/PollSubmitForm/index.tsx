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
  const {
    post: { title, description, images },
    choices,
  } = poll;
  const isVoted = choices.some((choice) => choice.isVoted);
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
          choices: choices.map((choice) => ({
            ...choice,
            isVoted: false,
            voteCount: choice.isVoted ? choice.voteCount - 1 : choice.voteCount,
          })),
        });
        return;
      }

      const { pollChoiceId } = voteData;
      updatePoll({
        ...poll,
        choices: choices.map((choice) => ({
          ...choice,
          isVoted: pollChoiceId === choice.id,
          voteCount:
            pollChoiceId === choice.id
              ? choice.voteCount + 1
              : choice.isVoted
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
      showResult={isVoted}
      onSelectChoice={(choiceId) =>
        createVote({
          pollId: poll.id,
          choiceId,
        })
      }
      footerRight={<ReactionButton {...postReaction} />}
    />
  );
}

export default PollSubmitForm;
