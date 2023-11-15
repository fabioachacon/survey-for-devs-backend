module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    globalTeardown: "<rootDir>/src/infra/database/mongodb/tests/configs/globalTeardown.ts",
    globalSetup: "<rootDir>/src/infra/database/mongodb/tests/configs/globalSetup.ts",
  };