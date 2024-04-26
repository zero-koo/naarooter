import type { Meta, StoryObj } from '@storybook/react';

import TextEditor from '.';

const meta = {
  title: 'Editor/TextEditor',
  component: TextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return <DefaultTextEditor />;
  },
};

const DefaultTextEditor = () => {
  function onAddImage(image: File) {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(URL.createObjectURL(image)), 1000);
    });
  }
  return (
    <div className="flex w-[300px]">
      <TextEditor onAddImage={onAddImage} />
    </div>
  );
};
