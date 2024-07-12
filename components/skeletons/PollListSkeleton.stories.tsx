import type { Meta, StoryObj } from '@storybook/react';

import PollListSkeleton from './PollListSkeleton';

const meta = {
  title: 'skeletons/PollListSkeleton',
  component: PollListSkeleton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PollListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
