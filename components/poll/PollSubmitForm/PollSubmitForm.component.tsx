import { numberFormat } from '@/utils/format';
import PollChoiceItem from '../PollChoiceItem';
import Link from 'next/link';

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
  showResult?: boolean;
  showLink?: boolean;
  onSelectChoice: (choiceId: string) => void;
}

export const PollSubmitFormComponent = ({
  id,
  title,
  description,
  choices,
  totalVoteCount,
  showResult = false,
  showLink = false,
  onSelectChoice,
}: PollSubmitFormProps) => {
  return (
    <div className={'bg-base-200 p-3'}>
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
};

export default PollSubmitFormComponent;
