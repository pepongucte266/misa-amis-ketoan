import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import MSDialogNoitice from './components/base/MSDialogNoitice.vue'
const app = createApp(App)
app.component('MSDialogNoitice', MSDialogNoitice)
app.use(router, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')