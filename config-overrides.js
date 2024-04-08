const {
  override,
  overrideDevServer,
  addWebpackAlias,
  addWebpackModuleRule,
  addBabelPlugin,
  addLessLoader,
  addBabelPreset,
  addWebpackPlugin,
} = require('customize-cra')
const S3Plugin = require('webpack-s3-plugin')
const noop = require('lodash/identity')

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

    addBabelPreset(['@emotion/babel-preset-css-prop']),

    process.env.COS_SECRET_ID && process.env.COS_SECRET_KEY
      ? addWebpackPlugin(
          new S3Plugin({
            exclude: /.*\.html$/,
            basePath: 'paperplane-app',
            s3Options: {
              accessKeyId: process.env.COS_SECRET_ID,
              secretAccessKey: process.env.COS_SECRET_KEY,
              region: 'ap-hongkong',
              endpoint: 'https://cos.ap-hongkong.myqcloud.com',
              apiVersion: '2006-03-01',
            },
            s3UploadOptions: {
              Bucket: 'paperplane-cdn-1253277322',
            },
            cdnizerOptions: {
              defaultCDNBase: 'https://cdn.paperplane.cc/paperplane-app',
            },
            progress: false,
          })
        )
      : noop
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
