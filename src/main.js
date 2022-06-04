import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import MSDialogNoitice from "./components/base/MSDialogNoitice.vue";
import MSToastBox from './components/base/MSToastBox.vue'
import Paginate from "vuejs-paginate-next";
const app = createApp(App)
app.component('MSToastBox', MSToastBox)
app.component('MSDialogNoitice', MSDialogNoitice)
app.component('VuePaginate', Paginate)
app.use(router, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
