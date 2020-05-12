const { merge } = require("lodash");
const rootBuildScript = require("../../package-scripts");

const { createBuildScripts } = require("@tkvw/build");

module.exports = merge(
  rootBuildScript,
  createBuildScripts((psu) => ({
    clean: psu.rimraf("*.vsix lib node_modules"),
    vscode: {
      extensions: {
        setup: `yarn add -D vsce`,
        package: `vsce package`,
      },
    },
  }))
);
