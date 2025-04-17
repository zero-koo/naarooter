import type { Meta, StoryObj } from '@storybook/react';

import CommunityDescriptionView from './CommunityDescriptionView';

const meta = {
  title: 'community/CommunityDescriptionView',
  component: CommunityDescriptionView,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CommunityDescriptionView>;

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
