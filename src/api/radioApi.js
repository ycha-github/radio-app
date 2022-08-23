import axios from 'axios';

export const radioApi = axios.create({
    baseURL: 'http://localhost:3001'
});