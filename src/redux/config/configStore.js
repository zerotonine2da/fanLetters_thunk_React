import { configureStore } from '@reduxjs/toolkit';
import letters from 'redux/modules/letters';
import member from 'redux/modules/member';
import auth from 'redux/modules/authSlice';

const store = configureStore({
    reducer: { letters, member, auth },
});

export default store;
