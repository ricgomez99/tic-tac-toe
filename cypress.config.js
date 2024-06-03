import { defineConfig } from 'cypress'
import codeCoverageTask from '@cypress/code-coverage/task.js'

export default defineConfig({
  video: false,

  e2e: {
    baseUrl: 'http://127.0.0.1:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      codeCoverageTask(on, config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
