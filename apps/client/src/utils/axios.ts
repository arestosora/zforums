import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
    