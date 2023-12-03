import { createSlice } from '@reduxjs/toolkit';
import { setAuthAPIAccessToken } from 'api/auth.api';

const initialState = {
    isLoggin: false,
    userId: localStorage.getItem('userId'),
    avatar: localStorage.getItem('avatar'),
    nickname: localStorage.getItem('nickname'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { userId, avatar, nickname, accessToken } = action.payload;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('nickname', nickname);

            setAuthAPIAccessToken(accessToken);

            state.isLoggin = true;
            state.userId = userId;
            state.avatar = avatar;
            state.nickname = nickname;
            state.accessToken = accessToken;
        },
        logout: (state, action) => {
            localStorage.clear();
            setAuthAPIAccessToken('');
            state.isLoggin = false;
        },
        changeNickName: (state, action) => {
            const nickname = action.payload;

            localStorage.setItem('nickname', nickname);
            state.nickname = nickname;
        },
        changeProfileImg: (state, action) => {
            const avatar = action.payload;
            localStorage.setItem('avatar', avatar);
            state.avatar = avatar;
        },
    },
});

export const { login, logout, changeNickName, changeProfileImg } = authSlice.actions;
export default authSlice.reducer;
