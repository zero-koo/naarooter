import type { Meta, StoryObj } from '@storybook/react';

import CommunityDescription from './CommunityDescription';

const meta = {
  title: 'community/CommunityDescription',
  component: CommunityDescription,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CommunityDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '내향방',
    description: '내향방입니다.',
    numUsers: 12030,
    topics: ['MBTI', '친목'],
  },
};
