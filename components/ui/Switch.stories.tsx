/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import Switch from './Switch';
import { School2Icon, SchoolIcon } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        value: 'A',
        text: 'A',
      },
      {
        value: 'B',
        text: 'B',
      },
      {
        value: 'C',
        text: 'CCCC',
      },
    ],
    size: 'lg',
    selected: 'A',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.selected);
    return (
      <Switch
        {...args}
        selected={selectedValue}
        onSelect={(value) => setSelectedValue(value)}
      />
    );
  },
};

export const Custom: Story = {
  args: {
    items: [
      {
        value: 'A',
        render: () => <SchoolIcon />,
      },
      {
        value: 'B',
        render: () => <School2Icon />,
      },
    ],
    selected: 'A',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.selected);
    return (
      <Switch
        {...args}
        selected={selectedValue}
        onSelect={(value) => setSelectedValue(value)}
      />
    );
  },
};
