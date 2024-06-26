import type { Meta, StoryObj } from '@storybook/react';

import CollapsibleContainer from './CollapsibleContainer';

const meta = {
  title: 'Component/CollapsibleContainer',
  component: CollapsibleContainer,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CollapsibleContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxAllowableHeight: 200,
    collapsedHeight: 100,
  },
  render: (args) => {
    return (
      <CollapsibleContainer {...args}>
        <div className="h-[300px] bg-slate-500" />
      </CollapsibleContainer>
    );
  },
};
