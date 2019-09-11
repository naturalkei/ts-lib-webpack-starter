const webpack = require('webpack')
const { resolve: pathResolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')

const LIBRARY_NAME = pkg.libraryName || 'customlib'

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const {
  DefinePlugin,
  LoaderOptionsPlugin
} = webpack

const plugins = [
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
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
    loaders: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          // https://github.com/s-panferov/awesome-typescript-loader#loader-options
          configFileName: 'tsconfig.webpack.json'
        }
      },
      'source-map-loader'
    ]
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
    path: pathResolve('./dist/umd'),
    filename: `${LIBRARY_NAME}.js`,
    library: LIBRARY_NAME,
    libraryTarget: 'umd'
  },
  node: {
    process: false
  },
  module: {
    rules: rules.filter(Boolean)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins,
  optimization: {
    minimize: isProd
  }
}

module.exports = config
