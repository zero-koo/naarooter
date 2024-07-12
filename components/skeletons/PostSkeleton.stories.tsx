import type { Meta, StoryObj } from '@storybook/react';

import PostSkeleton from './PostSkeleton';

const meta = {
  title: 'skeletons/PostSkeleton',
  component: PostSkeleton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PostSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
