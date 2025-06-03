const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const Dotenv = require("dotenv-webpack");

module.exports = {
  ...defaultConfig,
  externals: {
    ...defaultConfig.externals,
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [...defaultConfig.plugins, new Dotenv()],
};
