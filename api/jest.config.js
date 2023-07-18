module.exports = {
    testEnvironment: "node",
    testTimeout: 10000,
    verbose: true,
    collectCoverage: true,
    coverageReporters: ["text", "html","lcov","json"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  };

