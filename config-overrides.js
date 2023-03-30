const {
  override,
  overrideDevServer,
  addBabelPlugins,
  addWebpackAlias,
  fixBabelImports,
  addWebpackModuleRule,
  addBabelPlugin,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addBabelPlugins(['@emotion']),

    addWebpackAlias({ '@': 'src/' }),

    fixBabelImports('mui-core', {
      libraryName: '@mui/core',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports('mui-icon', {
      libraryName: '@mui/icon',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports('mui-lab', {
      libraryName: '@mui/lab',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    addBabelPlugin(['lodash']),

    addBabelPlugin([
      'babel-plugin-direct-import',
      { modules: ['@mui/material', '@mui/icons-material'] },
    ]),

    addWebpackModuleRule({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
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
