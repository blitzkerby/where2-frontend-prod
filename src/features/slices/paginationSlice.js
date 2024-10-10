// src/features/slices/paginationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        totalPage: 10,
    },
    reducers: {
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
    },
});

export const { setTotalPage } = paginationSlice.actions;
export default paginationSlice.reducer;
