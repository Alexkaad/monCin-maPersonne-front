const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({

  publicPath: '/',
  transpileDependencies: true,

  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: false
    }

  },

  chainWebpack: config => {
    config.set('devtool', 'source-map')
  },
// ← Ajouter cette partie pour Docker
  devServer: {
    host: '0.0.0.0',   // Écoute sur toutes les interfaces
    port: 8081,        // Port que tu veux exposer
    allowedHosts: 'all', // Pour accepter les connexions depuis Docker
    historyApiFallback: true
  }

});

