module.exports = {
  testEnvironment: 'jsdom', // or node
  rootDir: '.',
  roots: ['<rootDir>/test/', '<rootDir>/src'],
  testMatch: ['**/*.spec.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/web/'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageProvider: 'v8',

  // enable this for real typescript builds (slow but accurate)
  // preset: 'ts-jest',

  // enable this for fast, correct sourcemaps but not all features supported
  transform: {
    '\\.(js|jsx|ts|tsx)$': [
      '@stagas/sucrase-jest-plugin',
      {
        jsxPragma: 'h',
        jsxFragmentPragma: 'Fragment',
        production: true,
        disableESTransforms: true,
      },
    ],
  },

  // enable this for fast, incorrect sourcemaps but more features supported

  // transform: {
  //   '\\.(js|jsx|ts|tsx)$': [
  //     '@swc-node/jest',
  //     {
  //       experimentalDecorators: true,
  //       emitDecoratorMetadata: true,
  //       react: {
  //         pragma: 'h',
  //         pragmaFrag: 'Fragment',
  //       },
  //     },
  //   ],
  // },
}
