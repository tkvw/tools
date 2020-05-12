const findUp = require("find-up");
const npsUtils = require("nps-utils");

const babelConfig = findUp.sync("babel.config.js");
const babel = `babel --config-file ${babelConfig} --extensions .ts,.tsx`;
const babelCompile = `${babel} ./src -d lib`;

const jestConfig = findUp.sync("jest.config.js");
const jest = `jest --config ${jestConfig}`;

module.exports = {
  scripts: {
    build: {
      default: npsUtils.series.nps("clean", "build.prod.with_declarations"),
      dev: {
        default: `${babelCompile} --source-maps`,
        watch: `${babelCompile} --source-maps --watch`,
      },
      prod: {
        default: babelCompile,
        with_declarations: npsUtils.concurrent.nps(
          "build.prod",
          "declarations"
        ),
      },
    },
    clean: "rimraf lib",
    declarations: {
      default: `tsc --emitDeclarationOnly --outDir ./lib`,
      watch: `tsc --emitDeclarationOnly --outDir ./lib --watch`,
    },
    test: {
      default: jest,
      watch: `${jest} --watch`,
    },
    watch: {
      default: npsUtils.series.nps("clean", "watch.build"),
      build: npsUtils.concurrent.nps("build.dev.watch", "declarations.watch"),
    },
    publish: {
      default: `npm publish --dry-run`,
      public: `npm publish --dry-run --access public`,
    },
  },
};
