import { createApp,devtools } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'




const app = createApp(App)

   app.mount('#app')

if (process.env.NODE_ENV === 'development') {
    app.config.performance = true
    const { setupDevtoolsPlugin } = require('@vue/devtools-api')
    setupDevtoolsPlugin({
        id: 'my-app',
        label: 'My App',
        app
    })

}