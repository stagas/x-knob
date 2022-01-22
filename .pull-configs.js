const { pullConfigs } = require('pull-configs')

const local = __dirname + '/'
const remote = 'https://github.com/stagas/typescript-minimal-template/raw/main/'

const { assign, omit, sort, merge, replace } = pullConfigs(remote, local)

merge('package.json', (prev, next) => {
  assign(prev.scripts, omit(next.scripts, ['build:min', 'test']))
  sort(assign(prev.devDependencies, next.devDependencies))
})
replace('.eslintrc.js')
// replace('.prettierrc')
replace('jest.config.js')
replace('tsconfig.json')
replace('web-test-runner.config.js')
merge('.vscode/settings.json')
