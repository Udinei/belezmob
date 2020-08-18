import axios from 'axios';
const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
    //baseURL: 'https://belez-api.herokuapp.com',
});

export default api;