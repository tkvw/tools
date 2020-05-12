const { defaults } = require("jest-config");

module.exports = {
  moduleFileExtensions: ["ts", "tsx", ...defaults.moduleFileExtensions],
  rootDir: process.cwd(),
  testMatch: ["<rootDir>/**/src/**/*.(spec|test).ts(x|)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
        rootMode: "upward",
      },
    ],
  },
};
