import type { Meta, StoryObj } from '@storybook/react';

import PostListSkeleton from './PostListSkeleton';

const meta = {
  title: 'skeletons/PostListSkeleton',
  component: PostListSkeleton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PostListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
