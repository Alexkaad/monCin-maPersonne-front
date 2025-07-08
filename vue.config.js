const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({


  transpileDependencies: true,

  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: false
    }

  },

  chainWebpack: config => {
    config.set('devtool', 'source-map')
  }


});
