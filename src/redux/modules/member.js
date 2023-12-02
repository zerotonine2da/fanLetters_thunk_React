import { createSlice } from '@reduxjs/toolkit';

const initialState = '민지';

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
