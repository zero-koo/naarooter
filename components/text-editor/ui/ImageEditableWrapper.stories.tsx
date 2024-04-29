/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { ImageEditableWrapper } from './ImageEditableWrapper';

const meta = {
  title: 'Editor/ImageEditableWrapper',
  component: ImageEditableWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ImageEditableWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    indexLabel: '1-2',
  },
  render: (args) => {
    return (
      <ImageEditableWrapper {...args}>
        <div className="h-[300px] w-[300px] bg-blue-300"></div>
      </ImageEditableWrapper>
    );
  },
};
