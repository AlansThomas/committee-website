module.exports = {
    roots: ["<rootDir>/src"],
    clearMocks: true,
    testResultsProcessor: "jest-sonar-reporter",
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,mjs}",
      "!**/node_modules/**",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text", "text-summary", "cobertura", "lcov"],
    moduleFileExtensions: ["js", "json", "jsx", "module.css", "css"],
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)","**/__testData__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    testURL: "http://localhost",
    verbose: false,
    transformIgnorePatterns: ["node_modules/(?!axios)/"],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif)$": "identity-obj-proxy",
    },
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.jsx$": "babel-jest",
      ".+\\.(css|styl|less|sass|scss)$":
        "<rootDir>/node_modules/jest-css-modules-transform",
      // "^.+\\.svg$": "<rootDir>/svgTransform.js",
    },
      resetMocks: false,
      setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "react-dom/test-utils",
      ],
  };