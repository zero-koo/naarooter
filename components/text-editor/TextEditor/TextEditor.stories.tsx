import type { Meta, StoryObj } from '@storybook/react';

import TextEditor, { TextEditorHandle } from '.';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';

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

let id = 0;
const DefaultTextEditor = () => {
  function onAddImage({ image }: { image: File | string }) {
    return new Promise<string>((resolve) => {
      setTimeout(
        () =>
          resolve(
            typeof image === 'string' ? image : `path://image_path.com/${id++}`
          ),
        1000
      );
    });
  }

  const editor = useRef<TextEditorHandle>(null);

  return (
    <div className="w-[800px]">
      <div className="mb-2 flex gap-2">
        <Button
          onClick={async () => {
            console.log(await editor.current?.getSerializedState());
          }}
        >
          Print Serialized State
        </Button>
        <Button
          onClick={async () => {
            console.log(await editor.current?.getThumbnailImageURL());
          }}
        >
          Print Thumbnail URL
        </Button>
      </div>
      <TextEditor onAddImage={onAddImage} ref={editor} />
    </div>
  );
};
