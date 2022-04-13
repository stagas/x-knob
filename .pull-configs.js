const fs = require('fs')
const { pullConfigs } = require('pull-configs')

const local = __dirname + '/'
const remote = 'https://github.com/stagas/typescript-minimal-template/raw/main/'

const { assign, omit, sort, merge, replace } = pullConfigs(remote, local)

merge('package.json', (prev, next) => {
  prev.trustedDependencies ??= []
  prev.trustedDependencies = [
    ...new Set([...prev.trustedDependencies, ...(next.trustedDependencies ?? [])]),
  ].sort()
  prev.types = next.types
  prev.scripts = next.scripts
  prev.files = next.files
  sort(assign(prev.devDependencies, next.devDependencies))

  // deprecated
  delete prev.devDependencies['@stagas/documentation-fork']
  delete prev.devDependencies['@rollup/plugin-commonjs']
  delete prev.devDependencies['@stagas/sucrase-jest-plugin']
  delete prev.devDependencies['@web/dev-server-esbuild']
  delete prev.devDependencies['@web/dev-server-rollup']
  delete prev.devDependencies['esbuild']
  delete prev.devDependencies['esbuild-register']
  delete prev.devDependencies['prettier']
  delete prev.devDependencies['terser']
  delete prev.devDependencies['vite-web-test-runner-plugin']
})
replace('.gitattributes')
replace('.gitignore')
replace('.npmrc')
replace('.eslintrc.js')
replace('.pull-configs.js')
replace('.swcrc')
replace('dprint.json')
replace('jest.config.js')
replace('tsconfig.json')
replace('tsconfig.dist.json')
replace('web-test-runner.config.js')
replace('LICENSE')

const deprecated = [
  '.vscode/extensions.json',
  '.vscode',
  '.prettierrc',
  '.prettierignore',
  'example/tsconfig.json',
  'vite.config.js',
]
deprecated.forEach(x => {
  try {
    fs.rmSync(x, { recursive: true })
    console.log('removed', x)
  } catch {}
})
