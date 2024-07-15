import type { Meta, StoryObj } from '@storybook/react';

import CommunityLabel from './CommunityLabel';

const meta = {
  title: 'community/CommunityLabel',
  component: CommunityLabel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CommunityLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'sports',
  },
};
