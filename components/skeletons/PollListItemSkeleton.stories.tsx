import type { Meta, StoryObj } from '@storybook/react';

import PollListItemSkeleton from './PollListItemSkeleton';

const meta = {
  title: 'skeletons/PollListItemSkeleton',
  component: PollListItemSkeleton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PollListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
