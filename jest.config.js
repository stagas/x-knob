module.exports = {
  testEnvironment: 'jsdom', // 'node'
  rootDir: '.',
  roots: ['<rootDir>/test/', '<rootDir>/src'],
  testMatch: ['**/*.spec.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/web/'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageProvider: 'v8',
  resolver: require.resolve('@stagas/jest-node-exports-resolver'),
  // preset: 'ts-jest',
  transform: {
    '\\.(js|jsx|ts|tsx)$': [
      '@swc-node/jest',
      {
        swc: {
          jsc: {
            target: 'es2022',
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: true,
              dynamicImport: true,
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
              useDefineForClassFields: true,
              react: {
                runtime: 'automatic',
              },
              hidden: {
                jest: true,
              },
            },
            keepClassNames: true,
          },
        },
      },
    ],
  },
}
