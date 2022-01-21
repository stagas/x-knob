const { esbuildPlugin } = require('@web/dev-server-esbuild')
const { summaryReporter } = require('@web/test-runner')
const { fromRollup } = require('@web/dev-server-rollup')
const rollupCommonjs = require('@rollup/plugin-commonjs')

const commonjs = fromRollup(rollupCommonjs);

module.exports = {
  concurrency: 1,
  nodeResolve: true,
  files: ['test/**/*.spec.web.{ts,tsx}'],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsx: true,
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    }),
    commonjs(),
  ],
  reporters: [
    summaryReporter(),
  ],
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
