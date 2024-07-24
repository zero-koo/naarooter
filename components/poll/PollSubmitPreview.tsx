import { useRef, useState } from 'react';

import { randomInteger } from '@/lib/utils';

import PollSubmitFormComponent from './PollSubmitForm/PollSubmitForm.component';

interface PollSubmitPreviewProps {
  title: string;
  description?: string;
  images?: string[];
  choices: Array<{
    main: string;
    image?: File | string;
  }>;
}

const PollSubmitPreview = ({
  title,
  images,
  description,
  choices: initialChoices,
}: PollSubmitPreviewProps) => {
  const selectedIndex = useRef(randomInteger(initialChoices.length));
  const [choices, setChoices] = useState(
    initialChoices.map((choice, index) => ({
      id: String(index),
      index,
      main: choice.main,
      imageUrl:
        choice.image instanceof File
          ? URL.createObjectURL(choice.image)
          : choice.image,
      voted: selectedIndex.current === index,
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
            voted: false,
            voteCount: choice.voted ? choice.voteCount - 1 : choice.voteCount,
          };

        return {
          ...choice,
          voted: !choice.voted,
          voteCount: choice.voted ? choice.voteCount - 1 : choice.voteCount + 1,
        };
      })
    );
  };

  return (
    <PollSubmitFormComponent
      id={''}
      title={title}
      images={images}
      description={description}
      choices={choices}
      showResult
      totalVoteCount={totalVoteCount}
      onSelectChoice={handleSelectChoice}
    />
  );
};

export default PollSubmitPreview;
