import type { Meta, StoryObj } from '@storybook/react';

import ImageUploadPreview from './ImageUploadPreview';

const meta = {
  title: 'Component/ImageUploadPreview',
  component: ImageUploadPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select' },
    src: { control: 'text' },
  },
} satisfies Meta<typeof ImageUploadPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <ImageUploadPreview {...args} />;
  },
};
