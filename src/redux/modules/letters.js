import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lettersAPI from 'api/letters.api';
import axios from 'axios';

const initialState = {
    letters: [],
    isLoading: false,
    error: null,
    isError: false,
};

export const __getLetters = createAsyncThunk('getLetters', async (payload, thunkAPI) => {
    try {
        const response = await lettersAPI.get(`/letters?_sort=createAt&_order=desc`);
        console.log('response_get', response.data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __addLetters = createAsyncThunk('addLetters', async (payload, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/letters`, payload);
        console.log('response_add', response);
        thunkAPI.dispatch(__getLetters());
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __editLetters = createAsyncThunk('editLetters', async (payload, thunkAPI) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/letters/${payload.id}`, {
            content: payload.editingText,
        });
        console.log('response_edit', response);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteLetters = createAsyncThunk('deleteLetters', async (payload, thunkAPI) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/letters/${payload}`);
        thunkAPI.dispatch(__getLetters());
        console.log('response_delete', response);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

const lettersSlice = createSlice({
    name: 'letters',
    initialState,

    extraReducers: {
        [__getLetters.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getLetters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.letters = action.payload;
        },
        [__getLetters.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
        [__addLetters.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__addLetters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.letters.push(action.payload);
        },
        [__addLetters.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        [__editLetters.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__editLetters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;

            const { id, editingText } = action.payload;

            const letter = state.letters.find((letter) => letter.id === id);
            if (letter) {
                letter.content = editingText;
            }
        },
        [__editLetters.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        [__deleteLetters.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__deleteLetters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
        },
        [__deleteLetters.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    },
});

export const { deleteLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
