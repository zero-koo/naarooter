/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import YouTubeInsertModal from './YouTubeInsertModal';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { fn } from '@storybook/test';

const meta = {
  title: 'Editor/YouTubeInsertModal',
  component: YouTubeInsertModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialLink: { control: 'text' },
  },
  args: {
    onSave: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof YouTubeInsertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    initialLink: '',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>OPEN</Button>
        <YouTubeInsertModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};
