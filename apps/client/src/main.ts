import './index.css'
import 'primeicons/primeicons.css'
import './utils/axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(ToastService)

app.mount('#app')
