import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ReactionButton from './ReactionButton';

const meta = {
  title: 'Component/ReactionButton',
  component: ReactionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    likeCount: {
      type: 'number',
    },
    dislikeCount: {
      type: 'number',
    },
    selectedReaction: {
      control: 'select',
      options: ['like', 'dislike', null],
    },
    readonly: {
      type: 'boolean',
    },
  },
  args: {
    onClickLike: fn(),
    onClickDislike: fn(),
  },
} satisfies Meta<typeof ReactionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    likeCount: 1000,
    dislikeCount: 30,
    selectedReaction: 'like',
  },
};
