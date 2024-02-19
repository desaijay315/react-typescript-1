const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

// Determine the mode based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  // Entry point remains the same
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Add TypeScript loader
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
    minimize: isProduction, // Minify only in production
    minimizer: [new TerserPlugin()], // Use TerserPlugin for minification in production
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
};