import { createSlice } from '@reduxjs/toolkit';
/*
const SET_MEMBER = 'member/SET_MEMBER';

export const setMember = (payload) => {
    return { type: SET_MEMBER, payload };
};
*/
const initialState = '하니';

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember: (state, action) => {
            return action.payload;
        },
    },
});

export const { setMember } = memberSlice.actions;
export default memberSlice.reducer;
