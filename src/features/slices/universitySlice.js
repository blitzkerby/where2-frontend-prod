// src/features/slices/universitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from "../../config"

export const fetchUniversities = createAsyncThunk(
    'universities/fetchUniversities',
    async ({ page , limit }) => {
        const response = await axios.get(`${config.universities.getAllUniversities}?page=${page}&limit=${limit}`);
        return response.data;
    }
);

const universitySlice = createSlice({
    name: 'universities',
    initialState: {
        universities: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPage: 10,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUniversities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUniversities.fulfilled, (state, action) => {
                state.loading = false;
                state.universities = action.payload.universities;
                state.totalItems = action.payload.pagination.totalItems;
                state.totalPage = action.payload.pagination.totalPages;
                state.currentPage = action.payload.pagination.currentPage;
                state.pageSize = action.payload.pagination.pageSize;
            })
            .addCase(fetchUniversities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage, setTotalPage } = universitySlice.actions;
export default universitySlice.reducer;
