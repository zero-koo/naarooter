import type { Meta, StoryObj } from '@storybook/react';

import { SingleImageUploader } from './SingleImageUploader';
import { useState } from 'react';

const meta = {
  title: 'Component/SingleImageUploader',
  component: SingleImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SingleImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <DefaultSingleImageUploader {...args} />;
  },
};

const DefaultSingleImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <SingleImageUploader
      value={file}
      onChange={(file) => setFile(file ?? null)}
    />
  );
};
