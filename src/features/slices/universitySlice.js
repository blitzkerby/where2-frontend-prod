// src/features/slices/universitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from "../../config"

export const fetchUniversities = createAsyncThunk(
    'universities/fetchUniversities',
    async ({ page , limit }) => {
        const response = await axios.get(`${config.universities.getAllUniversity}?page=${page}&limit=${limit}`);
        return response.data;
    }
);

export const fetchUniversity = createAsyncThunk(
    'universities/fetchUniversity',
    async (id) => {
        const response = await axios.get(`${config.universities.getAllUniversity}/${id}`);
        return response.data;
    }
)

const universitySlice = createSlice({
    name: 'universities',
    initialState: {
        universities: [],
        universityId: 0,
        university: [],
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
            .addCase(fetchUniversity.pending, (state) => {
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
            .addCase(fetchUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.university = action.payload.university;
            })
            .addCase(fetchUniversities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setCurrentPage, setTotalPage } = universitySlice.actions;
export default universitySlice.reducer;
