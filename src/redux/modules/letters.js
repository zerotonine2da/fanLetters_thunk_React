import { createSlice } from '@reduxjs/toolkit';
import fakeData from 'fakeData.json';
/*
// 팬레터 추가
const ADD_LETTER = 'letters/ADD_LETTER';
// 팬레터 삭제
const DELETE_LETTER = 'letters/DELETE_LETTER';
// 팬레터 수정
const EDIT_LETTER = 'letters/EDIT_LETTER';

export const addLetter = (payload) => {
    return { type: ADD_LETTER, payload };
};
export const deleteLetter = (payload) => {
    return { type: DELETE_LETTER, payload };
};
export const editLetter = (payload) => {
    return { type: EDIT_LETTER, payload };
};
*/
const initialState = fakeData;

const lettersSlice = createSlice({
    name: 'letters',
    initialState,
    reducers: {
        addLetter: (state, action) => {
            const newLetter = action.payload;
            //기존 리덕스에서는 불변성을 위해서 스프레드로 적용
            //return [newLetter, ...state];
            //툴킷에서는 immer 기능이 내장되어있음.
            state.push(action.payload);
        },
        deleteLetter: (state, action) => {
            const letterId = action.payload;
            return state.filter((letter) => letter.id !== letterId);
        },
        editLetter: (state, action) => {
            const { id, editingText } = action.payload;
            return state.map((letter) => {
                if (letter.id === id) {
                    return { ...letter, content: editingText };
                }
                return letter;
            });
        },
    },
});

export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
