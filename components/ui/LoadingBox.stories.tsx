import type { Meta, StoryObj } from '@storybook/react';

import LoadingBox from './LoadingBox';

const meta = {
  title: 'UI/LoadingBox',
  component: LoadingBox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LoadingBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
