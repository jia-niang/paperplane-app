const {
  override,
  overrideDevServer,
  addWebpackAlias,
  addWebpackModuleRule,
  addBabelPlugin,
  addBabelPreset,
  addWebpackPlugin,
} = require('customize-cra')
const S3Plugin = require('webpack-s3-plugin')
const CspHtmlWebpackPlugin = require('@melloware/csp-webpack-plugin')
const noop = require('lodash/identity')

module.exports = {
  webpack: override(
    addWebpackAlias({ '@': 'src/' }),

    addWebpackModuleRule({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        { loader: 'resolve-url-loader', options: {} },
        {
          loader: 'sass-loader',
          options: { sourceMap: true, additionalData: '@import "~@/styles/variables.scss";' },
        },
      ],
    }),

    addBabelPlugin(['lodash']),

    addBabelPlugin(['@emotion']),

    addBabelPreset(['@emotion/babel-preset-css-prop']),

    process.env.NODE_ENV === 'production' && process.env.COS_SECRET_ID && process.env.COS_SECRET_KEY
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
          })
        )
      : noop,

    process.env.NODE_ENV === 'production' && process.env.COS_SECRET_ID && process.env.COS_SECRET_KEY
      ? function setPublicPath(config) {
          config.output.publicPath = '//cdn.paperplane.cc/paperplane-app/'
          config.output.crossOriginLoading = 'anonymous'

          return config
        }
      : noop,

    addWebpackPlugin(
      new CspHtmlWebpackPlugin(
        {
          'script-src': ["'strict-dynamic'"],
          'style-src': "'self' 'unsafe-inline' 'unsafe-eval'",
        },
        {
          primeReactEnabled: false,
          hashEnabled: { 'style-src': false },
          nonceEnabled: { 'style-src': false },
        }
      )
    )
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
