const webpack = require('webpack')
const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new HtmlWebpackPlugin({
    title: 'Typescript Webpack Starter',
    template: '!!ejs-loader!src/index.html'
  }),
  new webpack.LoaderOptionsPlugin({
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
  { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
]

if (isProd) {
  rules.push({
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    exclude: [/\/node_modules\//],
    query: {
      esModules: true
    }
  })
}

var config = {
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  context: resolve('./src'),
  entry: {
    main: './index.ts'
  },
  output: {
    path: resolve('./dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: rules.filter(Boolean)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: plugins,
  devServer: {
    contentBase: join(__dirname, 'dist/'),
    compress: true,
    port: 3030,
    hot: true
  }
}

module.exports = config
