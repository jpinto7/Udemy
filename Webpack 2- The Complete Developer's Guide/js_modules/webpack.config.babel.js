import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const webpackConfig = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

export default webpackConfig;
