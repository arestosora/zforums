import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './index.css'
import 'primevue/resources/themes/saga-blue/theme.css';   
import 'primevue/resources/primevue.min.css';             
import 'primeicons/primeicons.css';
import './axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app')
