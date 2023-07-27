import path from 'path'
import { loadConfigFromFile, mergeConfig } from "vite"
import type { StorybookConfig } from '@storybook/vue3-vite';
import type { UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.ts',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    disableTelemetry: true,
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  },
  async viteFinal(config, { configType }) {
    const userConfig = await loadUserConfig()

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      // plugins: [],
    })
  },
}

const loadUserConfig = async () => {
  const { config: userConfig } = await loadConfigFromFile(
    path.resolve(__dirname, "../vite.config.ts")
  )
  return userConfig
}

export default config
