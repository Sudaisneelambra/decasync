// src/axiosInstance.js
import axios from 'axios';

const commonaxios = axios.create({
    baseURL: 'http://localhost:3000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default commonaxios;
