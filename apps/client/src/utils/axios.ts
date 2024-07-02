import axios from 'axios'

axios.defaults.baseURL = 'https://animerse-production.up.railway.app/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
