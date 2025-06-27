import { createApp,devtools } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "@/router/index.";




const app = createApp(App)
    app.use(router)

if (process.env.NODE_ENV === 'development') {
    app.config.performance = true
    const { setupDevtoolsPlugin } = require('@vue/devtools-api')
    setupDevtoolsPlugin({
        id: 'my-app',
        label: 'My App',
        app
    })
    app.mount('#app')
}