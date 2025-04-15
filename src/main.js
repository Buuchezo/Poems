import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify' // Named import
import 'vuetify/styles'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createVuetify)

app.mount('#app')
