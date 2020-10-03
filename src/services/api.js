
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://159.203.106.82'
    // baseURL: 'http://10.0.2.2:3333'
    //__DEV__ ? 'http://10.0.2.2:3333' : 'https://belez-api.herokuapp.com',
});

export default api;