const CracoLessPlugin = require('craco-less');
const path = require('path');
const webpack = require('webpack');
const { when, whenDev, whenProd } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const fileFolder = 'src';

module.exports = {
  eslint: {
    enable: false /* (default value) */
    // mode: "extends" /* (default value) */ || "file",
    // configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    // configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
    // pluginOptions: { /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */ },
    // pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  },
  // output:{
  //   sourcePrefix: '',
  // },
  //
  // amd: {
  //   // Enable webpack-friendly use of require in Cesium
  //   toUrlUndefined: true,
  // },
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          style: true
        }
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
    ]
  },
  webpack: {
    configure: {
      resolve: {
        alias: {
          components: path.join(__dirname, './src/components'),
          images: path.join(__dirname, './src/res/images'),
          medias: path.join(__dirname, './src/res/media'),
          iconfonts: path.join(__dirname, './src/res/iconfont'),
          // media: path.join(__dirname, '../res/media'),
          pages: path.join(__dirname, './src/pages'),
          localData: path.join(__dirname, './src/testdata/localdata'),
          mockData: path.join(__dirname, './src/testdata/mockdata'),
          myutil: path.join(__dirname, './src/utils'),
          store: path.join(__dirname, './src/store'),
          cesium: path.resolve(__dirname, cesiumSource)
        }
      },
      output: {
        sourcePrefix: ''
      },
      amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
      },
      module:{
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: '@open-wc/webpack-import-meta-loader',
            }
          }]
      },
      plugins: [
        new CopyWebpackPlugin(
          {
            patterns: [
              // { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
              // { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
              // { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
              // { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
              { from: path.join(cesiumSource, 'Workers'), to: 'Workers' },
              { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
              { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
              { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }
            ]
          }
        ),
        // Define relative base path in cesium for loading assets
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('')
        })
      ]
    },

    // alias: {
    //   components: path.join(__dirname, './src/components'),
    //   images: path.join(__dirname, './src/res/images'),
    //   medias: path.join(__dirname, './src/res/media'),
    //   iconfonts: path.join(__dirname, './src/res/iconfont'),
    //   // media: path.join(__dirname, '../res/media'),
    //   pages: path.join(__dirname, './src/pages'),
    //   localData: path.join(__dirname, './src/testdata/localdata'),
    //   mockData: path.join(__dirname, './src/testdata/mockdata'),
    //   util: path.join(__dirname, './src/utils'),
    //   store: path.join(__dirname, './src/store'),
    //   cesium: path.resolve(cesiumSource),
    // },
    plugins: [
      ...whenProd(() => [new ProgressBarPlugin({
        format: '  build [:bar] :percent (:elapsed seconds)',
        clear: false,
        width: 60
      })], []),
      ...whenProd(() => [new BundleAnalyzerPlugin()], []),
      ...whenProd(() => [new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          mangle: true,
          output: {
            comments: false,
            beautify: false
          },
          compress: true,
          warnings: false
        }
      })], [])
    ]
    // plugins: {
    //   add: [], /* An array of plugins */
    //   remove: [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    // },
    // configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
    // configure: (webpackConfig, { env, paths }) => webpackConfig
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1581BF',
              '@layout-footer-background': '#365268',
              '@layout-trigger-background': '#365268',
              '@layout-trigger-color': '#fff',
              '@layout-sider-background': '#365268'
            },
            javascriptEnabled: true
          }
        }
      }
    }
    // {
    //   plugin:new CopyWebpackPlugin(
    //     {
    //       patterns: [
    //         // { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
    //         // { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
    //         // { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
    //         // { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
    //         { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
    //         { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
    //         { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
    //         { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
    //       ]
    //     }
    //   )
    // },
    // {
    //   plugin:new webpack.DefinePlugin({
    //     CESIUM_BASE_URL: JSON.stringify('')
    //   })
    // }

  ]
};
