import { numberFormat } from '@/utils/format';
import PollChoiceItem from '../PollChoiceItem';
import LikeDislike, { Reaction } from '@/components/LikeDislike';

interface PollSubmitFormProps {
  id: string;
  title: string;
  description: string;
  choices: Array<{
    id: string;
    main: string;
    imageUrl: string | null;
    index: number;
    voteCount: number;
    selected: boolean;
  }>;
  totalVoteCount: number;
  like: number;
  dislike: number;
  userReaction: Reaction;
  showResult?: boolean;
  onClick?: () => void;
  onSelectChoice: (choiceId: string) => void;
  onUpdateReaction?: (value: Reaction) => Promise<void>;
}

export const PollSubmitFormComponent = ({
  title,
  description,
  choices,
  totalVoteCount,
  like,
  dislike,
  userReaction,
  showResult = false,
  onClick,
  onSelectChoice,
  onUpdateReaction,
}: PollSubmitFormProps) => {
  return (
    <div className={'bg-base-200 p-3 px-2'} onClick={onClick}>
      <div className={'p-1 text-lg font-semibold'}>{title}</div>
      {description.trim() && (
        <div className={'p-1 text-xs opacity-90'}>{description}</div>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {choices
          .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
          .map(
            ({ id: choiceId, main, imageUrl, selected, voteCount }, index) => (
              <PollChoiceItem
                id={index}
                key={index}
                mainText={main}
                imageUrl={imageUrl}
                isSelected={selected}
                showResult={showResult}
                voteCountRate={(voteCount / totalVoteCount) * 100}
                onClick={() => onSelectChoice(choiceId)}
              />
            )
          )}
      </div>
      <div className="mt-3 flex items-center px-1 text-xs opacity-75">
        <div className="mr-auto">{numberFormat(totalVoteCount)}명 투표</div>
        <LikeDislike
          like={like}
          dislike={dislike}
          userSelect={userReaction}
          onUpdate={onUpdateReaction}
        />
      </div>
    </div>
  );
};

export default PollSubmitFormComponent;
