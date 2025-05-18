'use strict';

let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Імпорт плагіна для мініфікації CSS

module.exports = {
  mode: 'production',
  entry: './js/script.js',

  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: false,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader' // css-loader збирає CSS
          // Автоматична мініфікація CSS відбувається через плагін в optimization
        ]
      },
      // Правило для зображень, на які є посилання в CSS або JS
      // Це правило спіймає spinner.svg, якщо він імпортується або використовується в CSS,
      // але CopyWebpackPlugin нижче також скопіює його, якщо він у папці img.
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
            filename: '[path][name].[contenthash][ext]' // Зберігає структуру папок img/
        }
      },
       // Правило для шрифтів
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
         generator: {
            filename: '[path][name].[contenthash][ext]'
        }
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css' // Зібраний CSS файл в dist/css
    }),

    // Копіюємо статичні папки з кореня проєкту в dist
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'css'), // Копіює css/ в dist/css/
                to: path.resolve(__dirname, 'dist/css')
            },
            {
                from: path.resolve(__dirname, 'img'), // Копіює img/ в dist/img/ (включаючи підпапки типу tabs/ та form/)
                to: path.resolve(__dirname, 'dist/img')
            },
             {
                from: path.resolve(__dirname, 'icons'), // Копіює icons/ в dist/icons/
                to: path.resolve(__dirname, 'dist/icons')
            },
        ],
    }),
  ],

  // Налаштування оптимізації (включає мініфікацію)
  optimization: {
    minimize: true, // Увімкнути мініфікацію (у production режимі зазвичай увімкнено за замовчуванням, але можна явно)
    minimizer: [
      // Мініфікатор JS (за замовчуванням у Webpack 5 для production)
      // `...` означає "додай стандартні мініфікатори Webpack" (тобто Terser для JS)
      `...`,
      // Мініфікатор CSS
      new CssMinimizerPlugin(),
    ],
  },
};