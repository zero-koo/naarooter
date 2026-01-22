import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';

const meta = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['default', 'lg', 'sm', 'xs'],
      },
    },
    outline: { control: 'boolean' },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
