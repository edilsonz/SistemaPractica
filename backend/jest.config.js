/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  globals: {
    'jest': true,
  },
  collectCoverageFrom: [
    'src/services/**/*.js',
    'src/middlewares/**/*.js',
    'src/validations/**/*.js',
  ],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: { lines: 70 },
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
};
