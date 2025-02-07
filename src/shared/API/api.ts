import axios from 'axios';


const $api = axios.create({
    withCredentials:true,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default $api;