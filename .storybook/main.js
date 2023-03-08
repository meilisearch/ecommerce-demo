import path from 'path'
import { loadConfigFromFile, mergeConfig } from "vite"

module.exports = {
  stories: [
    '../stories/**/*.ts',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  },
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    )

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      // plugins: [],
    })
  }
}