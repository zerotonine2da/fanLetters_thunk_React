import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log('login');
            state.isLoggin = true;
        },
        logout: (state, action) => {
            console.log('logout');
            state.isLoggin = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
