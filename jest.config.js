module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['data-source'],
  moduleNameMapper: {
    '@(exception|domain|application|infra|util|application|presentation)/(.+)$':
      '<rootDir>/src/$1/$2',
  },
};
