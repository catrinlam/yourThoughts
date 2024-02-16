import axios from 'axios';

const baseURLs = {
    development: 'http://127.0.0.1:8000',
    staging: 'http://localhost:8000',
    domain: 'https://yourthoughts.me'
};

const environment = process.env.NODE_ENV || 'domain';
const baseURL = baseURLs[environment];

const api = axios.create({
    baseURL: baseURL
});

export default api;