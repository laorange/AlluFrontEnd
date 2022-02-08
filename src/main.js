// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import '@vant/touch-emulator';
import 'vant/lib/index.css';

import router from "./router/"
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(Vant)
app.use(router)
app.use(createPinia())
app.mount('#app')
