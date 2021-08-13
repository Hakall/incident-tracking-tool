// Tell webpack to compile the "@itt/common" package
// https://www.npmjs.com/package/next-transpile-modules
const withTM = require("next-transpile-modules")(["@itt/common"]);

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const nextConfig = {
  webpack: function (config, { webpack }) {
    config.resolve.plugins = [
      ...config.resolve.plugins,
      new TsconfigPathsPlugin(),
    ];
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
