import type { Meta, StoryObj } from '@storybook/react';

import TextEditor from '.';

const meta = {
  title: 'Editor/TextEditor',
  component: TextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mainText: { control: 'text' },
  },
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <DefaultTextEditor {...args} />;
  },
};

const DefaultTextEditor = () => {
  return (
    <div className="flex w-[300px]">
      <TextEditor />
    </div>
  );
};
