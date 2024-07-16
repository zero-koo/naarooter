import { numberFormat } from '@/utils/format';
import PollChoiceItem from '../PollChoiceItem';
import LikeDislike from '@/components/LikeDislike';
import { UserReaction } from '@/types/shared';
import TextViewer from '@/components/text-editor/TextViewer';
import ImageCarousel from '@/components/ImageCarousel';
import CollapsibleContainer from '@/components/CollapsibleContainer';
import GrayBox from '@/components/ui/GrayBox';

interface PollSubmitFormProps {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  choices: Array<{
    id: string;
    main: string;
    imageUrl?: string | null;
    index: number;
    voteCount: number;
    selected: boolean;
  }>;
  totalVoteCount: number;
  like: number;
  dislike: number;
  userReaction: UserReaction;
  showResult?: boolean;
  onClick?: () => void;
  onSelectChoice: (choiceId: string) => void;
  onUpdateReaction?: (value: UserReaction) => Promise<void>;
}

export const PollSubmitFormComponent = ({
  title,
  description,
  images = [],
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
    <GrayBox className={'py-3 md:px-1 md:py-4'} onClick={onClick}>
      <div className={'mb-2 px-3 text-lg font-semibold'}>{title}</div>
      {images.length ? (
        <div className="px-2">
          <ImageCarousel images={images.map((src) => ({ src }))} />
        </div>
      ) : null}
      {description && <TextViewer initialValue={description} />}
      <CollapsibleContainer
        maxAllowableHeight={250}
        collapsedHeight={220}
        extendText="더보기"
      >
        <div className="mt-2 flex flex-col gap-2 p-2">
          {choices
            .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
            .map(
              (
                { id: choiceId, main, imageUrl, selected, voteCount },
                index
              ) => (
                <PollChoiceItem
                  id={index}
                  key={index}
                  mainText={main}
                  imageUrl={imageUrl ?? undefined}
                  isSelected={selected}
                  showResult={showResult}
                  voteCountRate={(voteCount / totalVoteCount) * 100}
                  onClick={() => onSelectChoice(choiceId)}
                />
              )
            )}
        </div>
      </CollapsibleContainer>
      <div className="mt-3 flex items-center px-3 text-xs opacity-75">
        <div className="mr-auto">{numberFormat(totalVoteCount)}명 투표</div>
        <LikeDislike
          like={like}
          dislike={dislike}
          userSelect={userReaction}
          onUpdate={onUpdateReaction}
        />
      </div>
    </GrayBox>
  );
};

export default PollSubmitFormComponent;
