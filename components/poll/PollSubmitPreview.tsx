import { randomInteger } from '@/lib/utils';
import PollSubmitFormComponent from './PollSubmitForm/PollSubmitForm.component';
import { useRef, useState } from 'react';

interface PollSubmitPreviewProps {
  title: string;
  description: string;
  choices: Array<{
    main: string;
    image?: File;
  }>;
}

const PollSubmitPreview = ({
  title,
  description,
  choices: initialChoices,
}: PollSubmitPreviewProps) => {
  const selectedIndex = useRef(randomInteger(initialChoices.length));
  const [choices, setChoices] = useState(
    initialChoices.map((choice, index) => ({
      id: String(index),
      index,
      main: choice.main,
      imageUrl: choice.image ? URL.createObjectURL(choice.image) : null,
      selected: selectedIndex.current === index,
      voteCount: randomInteger(100, 1),
    }))
  );
  const totalVoteCount = choices.reduce(
    (sum, choice) => sum + choice.voteCount,
    0
  );

  const handleSelectChoice = (id: string) => {
    setChoices((choices) =>
      choices.map((choice) => {
        if (choice.id !== id)
          return {
            ...choice,
            selected: false,
            voteCount: choice.selected
              ? choice.voteCount - 1
              : choice.voteCount,
          };

        return {
          ...choice,
          selected: !choice.selected,
          voteCount: choice.selected
            ? choice.voteCount - 1
            : choice.voteCount + 1,
        };
      })
    );
  };

  return (
    <PollSubmitFormComponent
      id={''}
      title={title}
      description={description}
      choices={choices}
      like={0}
      dislike={0}
      userReaction={null}
      showResult
      totalVoteCount={totalVoteCount}
      onSelectChoice={handleSelectChoice}
    />
  );
};

export default PollSubmitPreview;
