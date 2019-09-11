const { BannerPlugin } = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const pkg = require('./package.json')
const { multibanner } = require('bannerjs')
const { remove, pick } = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { library: LIBRARY_NAME } = common.output
const banner = multibanner(pick(pkg, [
  'author',
  'name',
  'license',
  'version',
  'description',
  'homepage'
]))
const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // https://webpack.js.org/plugins/banner-plugin/
    new BannerPlugin({
      raw: true,
      banner
    })
  ]
}

function generateConfig (name) {
  const config = merge(common, prodConfig)
  const { output, optimization, plugins } = config
  const uglify = name.indexOf('min') > -1
  optimization.minimize = uglify
  if (uglify) {
    output.filename = `${LIBRARY_NAME}.min.js`
    remove(plugins, p => p instanceof HtmlWebpackPlugin)
  }
  return config
}

module.exports = [LIBRARY_NAME, `${LIBRARY_NAME}.min`].map(key => {
  return generateConfig(key)
})
