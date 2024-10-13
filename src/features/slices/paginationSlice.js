// src/features/slices/paginationSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
export const fetchAllList = createAsyncThunk(
    'allList',
    async ({ page , limit, model}, { dispatch }) => {
        const response = await axios.get(`${ config.list.getAllList(model)}?page=${page}&limit=${limit}`);
        
        // Dispatch actions to update pagination state
        dispatch(setTotalPage(response.data.pagination.totalPages));       
        return response.data;
    }
);
const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        data: [],
        loading: false,
        error: null,
        totalPage: 10,
    },
    reducers: {
        setTotalPage: (state, action) => {
            state.totalPage = 0;
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchAllList.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAllList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;

            })
            .addCase(fetchAllList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

        })
    }
});

export const { setTotalPage } = paginationSlice.actions;
export default paginationSlice.reducer;
