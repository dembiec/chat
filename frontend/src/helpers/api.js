import axios from 'axios';

let headers = {
    'Content-Type': `application/json` 
} 

const location = window.location.pathname;
if (location !== "/login" || location !== "/register") {
    if (localStorage.token) {
        headers.Authorization = `Bearer ${localStorage.token}`;
    }
}

const Api = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    headers
});

export default Api;