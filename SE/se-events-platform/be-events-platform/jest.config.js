module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js'],
    clearMocks: true,
    setupFiles: ['<rootDir>/src/tests/setup.ts'], // Add the setup file here
  };
  
  