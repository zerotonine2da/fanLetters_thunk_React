import axios from 'axios';
import authAPI from './auth.api';

const lettersAPI = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

// 2:
// API 서버에 팬레터 추가나 팬레터 조회를 하기 전에
// 반드시 auth 서버에 accessToken이 유효한지 확인해라.
lettersAPI.interceptors.request.use(
    async (config) => {
        const authServerResponse = await authAPI.get('/user');
        const authServerData = authServerResponse.data;
        const success = authServerData.success;

        if (success) return config;
        //로그아웃시 처리하는 코드 작성
        //throw new Error();
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default lettersAPI;
