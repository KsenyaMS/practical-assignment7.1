export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    testEnvironment: 'jest-fixed-jsdom',
  };