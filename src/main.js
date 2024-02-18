import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'



const vue = createApp(App)
vue.use(router)


vue.mount('#app')

