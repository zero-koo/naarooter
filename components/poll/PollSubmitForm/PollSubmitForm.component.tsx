import { TPollChoice } from '@/server/api/routers/poll/poll.type';
import { numberFormat } from '@/utils/format';

import CollapsibleContainer from '@/components/CollapsibleContainer';
import ImageCarousel from '@/components/ImageCarousel';
import TextViewer from '@/components/text-editor/TextViewer';

import PollChoiceItem from '../PollChoiceItem';

interface PollSubmitFormProps {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  choices: Array<TPollChoice>;
  totalVoteCount: number;
  showResult?: boolean;
  onSelectChoice: (choiceId: string | null) => void;
  footerRight?: React.ReactNode;
}

export const PollSubmitFormComponent = ({
  description,
  images = [],
  choices,
  totalVoteCount,
  showResult = false,
  onSelectChoice,
  footerRight,
}: PollSubmitFormProps) => {
  return (
    <>
      {images.length ? (
        <div className="px-2 py-1">
          <ImageCarousel images={images.map((src) => ({ src }))} />
        </div>
      ) : null}
      {description && <TextViewer value={description} />}
      <CollapsibleContainer
        maxAllowableHeight={250}
        collapsedHeight={220}
        extendText="더보기"
      >
        <div className="flex flex-col gap-2 p-2">
          {choices
            .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
            .map(
              ({ id: choiceId, main, imageUrl, isVoted, voteCount }, index) => (
                <PollChoiceItem
                  id={index}
                  key={index}
                  mainText={main}
                  imageUrl={imageUrl ?? undefined}
                  isSelected={isVoted}
                  showResult={showResult}
                  voteCountRate={(voteCount / totalVoteCount) * 100}
                  onClick={() => onSelectChoice(isVoted ? null : choiceId)}
                />
              )
            )}
        </div>
      </CollapsibleContainer>
      <div className="mt-3 flex items-center px-3 text-xs opacity-75">
        <div className="mr-auto">{numberFormat(totalVoteCount)}명 투표</div>
        {footerRight}
      </div>
    </>
  );
};

export default PollSubmitFormComponent;
