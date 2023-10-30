const {
  override,
  overrideDevServer,
  addWebpackAlias,
  addWebpackModuleRule,
  addBabelPlugin,
  addLessLoader,
  addBabelPreset,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackAlias({ '@': 'src/' }),

    addWebpackModuleRule({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: { additionalData: '@import "~@/styles/variables.scss";' },
        },
      ],
    }),

    addLessLoader({
      lessOptions: {
        globalVars: {},
        modifyVars: {},
      },
    }),

    addBabelPlugin(['lodash']),

    addBabelPlugin(['@emotion']),

    addBabelPreset(['@emotion/babel-preset-css-prop'])
  ),

  devServer: overrideDevServer(devServerConfig => ({
    ...devServerConfig,
    proxy: {
      '/api': {
        target: 'http://localhost:6100',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  })),
}
