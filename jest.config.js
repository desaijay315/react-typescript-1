
module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    collectCoverage: true,
    coverageDirectory: "coverage/jest",
    transformIgnorePatterns: [".*(node_modules).*$"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    testPathIgnorePatterns: ["<rootDir>/src/__tests__/testData"],
  };
  