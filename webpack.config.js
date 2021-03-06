const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, optimize } = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const THEME_DIR = 'src/';

// Plugins
const plugins = [];

plugins.push(new HtmlWebpackPlugin({
  template: THEME_DIR + 'public/index.html',
  inject: 'body',
  filename: 'index.html',
}));

plugins.push(new HtmlWebpackPlugin({
  template: THEME_DIR + 'public/humans.txt',
  inject: false,
  filename: 'humans.txt',
}));

plugins.push(new FaviconsWebpackPlugin({
  logo: './src/public/favicon.png',
  inject: true,
}));

if (NODE_ENV === 'production') {
  plugins.push(new optimize.DedupePlugin());
  plugins.push(new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }));
  plugins.push(new optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
    },
  }));
  plugins.push(new ExtractTextPlugin('texascamp.[hash].css'));
  // plugins.push(new ImageminPlugin(['/.*/', './icons-*/**']));
  plugins.push(new StyleExtHtmlWebpackPlugin());
}

// Loaders
const loaders = [
  {
    test: /\.yaml$/,
    loaders: ['json', 'yaml'],
  },
  {
    test: /\.js|.jsx$/,
    exclude: /node_modules/,
    loader: 'babel',
    query:
    {
      presets:['react']
    }
  },
  {
    test: /\.png|.svg|.jpg|.gif|\.ttf|\.woff|\.eot|\.ico$/,
    loaders: ['file'],
  },
  {
    test: /\.pdf$/,
    loader: 'file',
    query:
    {
      name: '[name]-[hash].[ext]'
    }
  },
];

if (NODE_ENV === 'production') {
  loaders.push({
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
  });
} else {
  loaders.push({
    test: /\.s?css$/,
    loaders: ['style', 'css', 'postcss', 'sass'],
  });
}

module.exports = {
  entry: "./" + THEME_DIR + 'index.jsx',
  output: {
    path: `${__dirname}` + '/build',
    filename: 'texascamp.[hash].js',
  },
  module: {
    noParse: [
      path.resolve('node_modules/react-quill/node_modules/quill/dist/quill.js'),
      path.resolve('node_modules/quill/dist/quill.js'),
    ],
    loaders,
  },
  postcss: () => [autoprefixer],
  plugins,
};
