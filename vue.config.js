const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      })
    ],
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve('buffer/'),
        fs: false
      },
    },
  },
})
