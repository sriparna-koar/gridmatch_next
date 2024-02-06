// module.exports = {
//   reactStrictMode: true,
// }
module.exports = {

  reactStrictMode: true,
  module: {
    rules: [
      // other rules...
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'sounds/',
            },
          },
        ],
      },
    ],
  },
};
