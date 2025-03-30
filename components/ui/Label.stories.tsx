import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'destructive', 'outline'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    rounded: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};
