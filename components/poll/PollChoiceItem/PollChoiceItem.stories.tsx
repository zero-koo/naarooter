import type { Meta, StoryObj } from '@storybook/react';

import PollChoiceItem from './PollChoiceItem.component';
import { useState } from 'react';

const meta = {
  title: 'Example/PollChoiceItem',
  component: PollChoiceItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mainText: { control: 'text' },
  },
} satisfies Meta<typeof PollChoiceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainText: 'A형',
    isSelected: false,
    showResult: false,
    voteCountRate: 25,
    imageUrl: null,
  },
  render: (args) => {
    return <DefaultPollChoiceItem {...args} />;
  },
};

const DefaultPollChoiceItem = (args: Parameters<typeof PollChoiceItem>[0]) => {
  const [showResult, setShowResult] = useState(false);
  return (
    <div className="flex w-[500px] p-10">
      <PollChoiceItem
        {...args}
        isSelected={showResult}
        showResult={showResult}
        onClick={() => setShowResult(!showResult)}
      />
    </div>
  );
};

export const BeforeVote: Story = {
  args: {
    mainText: 'A형',
    isSelected: false,
    showResult: false,
    voteCountRate: 25,
    imageUrl: null,
  },
  render: (args) => {
    return (
      <div className="flex w-[500px] p-10">
        <PollChoiceItem {...args} />
      </div>
    );
  },
};

export const AfterVote: Story = {
  args: {
    mainText: 'A형',
    isSelected: true,
    showResult: true,
    voteCountRate: 25,
    imageUrl: null,
  },
  render: (args) => {
    return (
      <div className="flex w-[500px] p-10">
        <PollChoiceItem {...args} />
      </div>
    );
  },
};
