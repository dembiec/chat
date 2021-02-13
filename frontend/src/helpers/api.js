import axios from 'axios';

const Api = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const JWTtoken = (token) => {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default Api;