const { BannerPlugin } = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const pkg = require('./package.json')
const { multibanner } = require('bannerjs')
const { pick } = require('lodash')

const banner = multibanner(pick(pkg, [
  'author',
  'name',
  'license',
  'version',
  'description',
  'homepage'
]))

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // https://webpack.js.org/plugins/banner-plugin/
    new BannerPlugin({
      raw: true,
      banner
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [/\/node_modules\//],
        query: {
          esModules: true
        }
      }
    ]
  }
})
