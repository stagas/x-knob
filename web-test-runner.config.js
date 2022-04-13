const { chromeLauncher, summaryReporter } = require('@web/test-runner')
const { vite } = require('wtr-plugin-vite')

module.exports = {
  concurrency: 1,
  nodeResolve: true,
  files: ['test/**/*.spec.web.{ts,tsx}'],
  plugins: [vite()],
  browsers: [chromeLauncher({
    launchOptions: {
      args: [
        '--allow-insecure-localhost',
        '--autoplay-policy=no-user-gesture-required',
        '--ignore-certificate-errors',
        '--mute-audio',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
      ],
    },
  })],
  reporters: [summaryReporter()],
  coverageConfig: {
    include: ['src/**/*.{ts,tsx}'],
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script type="module" src="${testFramework}"></script>
        <script type="module">import 'jest-browser-globals';</script>
      </head>
    </html>
  `,
}
