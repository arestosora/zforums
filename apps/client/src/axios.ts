import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
