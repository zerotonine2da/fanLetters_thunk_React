import axios from 'axios';

const authAPI = axios.create({ baseURL: process.env.REACT_APP_AUTH_SERVER_URL });

export function setAuthAPIAccessToken(token) {
    authAPI.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
}

export default authAPI;
