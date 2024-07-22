import { trpc } from '@/client/trpcClient';
import { UserReaction } from '@/types/shared';

import {
  usePollQuery,
  useUpdatePollQueryData,
} from '@/hooks/queries/usePollQuery';
import { useToast } from '@/hooks/useToast';

import PollSubmitFormComponent from './PollSubmitForm.component';

type PollSubmitFormProps = {
  id: string;
  initialData?: any;
  showLink?: boolean;
  onClick?: () => void;
  onUpdateReaction?: (value: UserReaction) => Promise<void>;
};

function PollSubmitForm({
  id,
  initialData,
  onClick,
  onUpdateReaction,
}: PollSubmitFormProps) {
  const { data } = usePollQuery(id, initialData);
  const { title, description, images, choices, voted, postReaction } = data;
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
          voted: false,
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
        voted: true,
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
      images={images}
      choices={choices}
      totalVoteCount={totalVoteCount}
      like={postReaction.likeCount}
      dislike={postReaction.dislikeCount}
      userReaction={postReaction.userReaction}
      showResult={voted}
      onClick={onClick}
      onSelectChoice={(choiceId) =>
        createVote({
          pollId: data.pollId,
          choiceId,
        })
      }
      onUpdateReaction={onUpdateReaction}
    />
  );
}

export default PollSubmitForm;
