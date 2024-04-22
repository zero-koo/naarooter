/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import ImageInsertDialog from './ImageInsertDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Editor/ImageInsertDialog',
  component: ImageInsertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ImageInsertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onSave: () => undefined,
    onClose: () => undefined,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>OPEN</Button>
        {open && <ImageInsertDialog {...args} onClose={() => setOpen(false)} />}
      </>
    );
  },
};
