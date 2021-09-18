import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  collectCoverage: true,
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  coverageReporters: [
    ['clover', {}],
    ['cobertura', {}],
    [
      'html',
      {
        subdir: 'html',
        verbose: true,
      },
    ],
    ['json', {}],
    ['lcov', {}],
    ['text', {}],
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
  moduleNameMapper: {},
  rootDir: './src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '^.+\\.spec\\.ts?$',
  transform: {
    '^.+\\.spec\\.ts$': 'ts-jest',
  },
  verbose: true,
};

export default async (): Promise<Config.InitialOptions> => config;
