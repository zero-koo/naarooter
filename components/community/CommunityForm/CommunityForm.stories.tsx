import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CommunityForm from './CommunityForm';

const meta = {
  title: 'community/CommunityForm',
  component: CommunityForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof CommunityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
