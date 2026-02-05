module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/integration'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.js'],
  testTimeout: 15000,
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        strict: false,
        noImplicitAny: false,
      },
    },
  },
};
