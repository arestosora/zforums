import './index.css';
import './assets/styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'primeicons/primeicons.css';
import './core/axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import ToastService from 'primevue/toastservice';
import VueSweetalert2 from 'vue-sweetalert2';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);
app.use(VueSweetalert2);
app.use(createPinia());
app.use(router);

app.mount('#app');
