import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path'

const __dirname = path.resolve();

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
     config.resolve.alias = {
       ...config.resolve.alias,
         "@": path.resolve(__dirname, "../")
       };
     }
 
   return config;
 }
};
export default config;
