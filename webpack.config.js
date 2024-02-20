const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

// Determine the mode based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopement = process.env.NODE_ENV === 'development';
const isDeployment = process.env.NODE_ENV === 'deployment';

module.exports = {
  mode: isProduction || isDeployment ? 'production' : 'development',
  entry: './src',
  output: isProduction ? {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  } : isDevelopement ? {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }: {
    publicPath: '/container/latest/',
    filename: '[name].[contenthash].js'
  } ,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], 
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/public/index.html",
      filename: "./index.html"
    })
  ],
  optimization: {
    minimize: isProduction || isDeployment, // Minify only in production
    minimizer: [new TerserPlugin()], // Use TerserPlugin for minification in production
    splitChunks: {
      chunks: 'all', 
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
};
