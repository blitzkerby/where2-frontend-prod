// src/features/slices/universitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from "../../config"
import { setTotalPage } from './paginationSlice';

/**
 * Fetch all universities with pagination.
 * @route GET /universities
 * @param {Object} param - The pagination parameters.
 * @param {number} param.page - The current page number.
 * @param {number} param.limit - The number of items per page.
 * @access Public
 */
export const fetchUniversities = createAsyncThunk(
    'universities/fetchUniversities',
    async ({ page , limit }, { dispatch }) => {
        const response = await axios.get(`${config.universities.getAllUniversity}?page=${page}&limit=${limit}`);
        
        // Dispatch actions to update pagination state
        dispatch(setTotalPage(response.data.pagination.totalPages));       
        return response.data;
    }
);

/**
 * Fetch a specific university by ID.
 * @route GET /universities/:id
 * @param {number} id - The ID of the university to fetch.
 * @access Public
 */
export const fetchUniversity = createAsyncThunk(
    'universities/fetchUniversity',
    async (id) => {
        const response = await axios.get(`${config.universities.getUniversityById}/${id}`);
        return response.data;
    }
)

/**
 * Search universities by query.
 * @route GET /universities/search
 * @param {string} query - The search query.
 * @access Public
 */
export const searchUniversities = createAsyncThunk(
    'universities/searchUniversities',
    async (query) => {
        const response = await axios.get(`${config.universities.search}?query=${encodeURIComponent(query)}`);

        // Dispatch actions to update pagination state
        dispatch(setTotalPage(response.data.pagination.totalPages));       
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
    },
    reducers: {
        setUniversities: (state, action) => {
            state.universities = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            /**
             * Fetch all universities.
             * @route GET /universities
             * @access Public
             */
            .addCase(fetchUniversities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUniversities.fulfilled, (state, action) => {
                state.loading = false;
                state.universities = action.payload.universities;
            })
            .addCase(fetchUniversities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            /**
             * Fetch a specific university by ID.
             * @route GET /universities/:id
             * @access Public
             */
            .addCase(fetchUniversity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.university = action.payload.university;
            })
            .addCase(fetchUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            /**
             * Search universities by query.
             * @route GET /universities/search
             * @access Public
             */
            .addCase(searchUniversities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUniversities.fulfilled, (state, action) => {
                state.loading = false;
                state.universities = action.payload;
            })
            .addCase(searchUniversities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setUniversities } = universitySlice.actions;
export default universitySlice.reducer;
