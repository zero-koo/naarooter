import type { Meta, StoryObj } from '@storybook/react';

import PostListItemSkeleton from './PostListItemSkeleton';

const meta = {
  title: 'skeletons/PostListItemSkeleton',
  component: PostListItemSkeleton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PostListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
