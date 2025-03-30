import { StorybookTrpcProvider } from '@/.storybook/mocks/trpc';
import { communityTopicsFixture } from '@/fixtures';
import { withTrpcContext } from '@/mocks/trpc';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CommunityForm from './CommunityForm';

const meta = {
  title: 'community/CommunityForm',
  component: CommunityForm,
  decorators: [
    withTrpcContext((context) => {
      context.community.topics.setData(undefined, {
        topics: communityTopicsFixture,
      });
    }),
    (Story: React.FC) => (
      <StorybookTrpcProvider>
        <Story />
      </StorybookTrpcProvider>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof CommunityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      name: '커뮤니티 이름',
      description: '커뮤니티 설명',
      topics: [
        {
          id: '1',
          name: '토픽 이름',
        },
      ],
    },
  },
};
