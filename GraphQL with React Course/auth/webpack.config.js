import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
};

export default webpackConfig;
