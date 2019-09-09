const webpack = require('webpack')
const { resolve: pathResolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const nodeEnv = process.env.NODE_ENV || 'development'

const {
  // DefinePlugin,
  LoaderOptionsPlugin
} = webpack

const plugins = [
  // new DefinePlugin({
  //   'process.env': {
  //     NODE_ENV: JSON.stringify(nodeEnv)
  //   }
  // }),
  // https://github.com/jantimon/html-webpack-plugin
  new HtmlWebpackPlugin({
    title: 'Typescript Webpack Starter',
    template: 'index.hbs'
  }),
  new LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true
      }
    }
  })
]

const rules = [
  {
    enforce: 'pre',
    test: /\.tsx?$/,
    exclude: [/\/node_modules\//],
    use: ['awesome-typescript-loader', 'source-map-loader']
  },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.hbs$/, loader: 'handlebars-loader' },
  { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
]

var config = {
  context: pathResolve('./src'),
  entry: {
    main: './index.ts'
  },
  output: {
    path: pathResolve('./dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: rules.filter(Boolean)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins
}

module.exports = config
