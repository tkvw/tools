module.exports = (api) => {
  const isTest = api.env("test");
  return {
    ignore: isTest ? [] : ["**/*.spec.ts"],
    presets: [
      [
        "@babel/env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      ["@babel/preset-typescript"],
    ],
  };
};
