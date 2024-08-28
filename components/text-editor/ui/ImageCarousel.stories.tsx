/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import ImageCarousel from './ImageCarousel';

const meta = {
  title: 'Editor/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      {
        src: 'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg',
      },
      {
        src: 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
      },
      {
        src: 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
      },
      {
        src: 'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
      },
    ],
    index: 0,
  },
  render: (args) => {
    return (
      <div className="w-[300px]">
        <ImageCarousel {...args} />
      </div>
    );
  },
};
