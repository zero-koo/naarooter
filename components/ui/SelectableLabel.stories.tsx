import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SelectableLabel } from './SelectableLabel';

const meta = {
  title: 'UI/SelectableLabel',
  component: SelectableLabel,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof SelectableLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <SelectableLabel selected={selected} onSelect={setSelected}>
        Label
      </SelectableLabel>
    );
  },
};
