import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import config from "../../config"

export const fetchScholarships = createAsyncThunk(
    'scholarships/fetchScholarships',
    async (id) => {
        const response = await axios.get(config.scholarships.getAllScholarships(id));
        return response.data.scholarship;
    }
);

const scholarshipsSlice = createSlice({
    name: 'scholarships',
    initialState: {
        scholarships: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScholarships.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScholarships.fulfilled, (state, action) => {
                state.loading = false;
                state.scholarships = [action.payload];
            })
            .addCase(fetchScholarships.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default scholarshipsSlice.reducer;

