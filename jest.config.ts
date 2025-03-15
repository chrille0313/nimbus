import fs from 'fs';
import path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';

const basePath = path.resolve(__dirname, 'packages');
const packages = fs.readdirSync(basePath).filter((name) => {
  return fs.lstatSync(path.join(basePath, name)).isDirectory();
});
console.log(packages);
console.log({
  ...packages.reduce(
    (acc, name) => ({
      ...acc,
      [`@repo/${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`
    }),
    {}
  )
});

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  testPathIgnorePatterns: ['./dist'],
  moduleNameMapper: {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@repo/${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`
      }),
      {}
    )
  }
};

export default config;
