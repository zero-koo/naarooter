import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MultipleImageUploader } from './MultipleImageUploader';

const meta = {
  title: 'Component/MultipleImageUploader',
  component: MultipleImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MultipleImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <DefaultSingleImageUploader {...args} />;
  },
};

const DefaultSingleImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <MultipleImageUploader
      values={files}
      onAdd={(newFiles) => setFiles((files) => [...files, ...newFiles])}
      onRemove={(index) =>
        setFiles((files) => files.filter((_, i) => i !== index))
      }
    />
  );
};
