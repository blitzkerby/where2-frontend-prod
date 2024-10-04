// src/features/slices/universitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:4000/api/university/",
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem("token")}`,
    // }
});

export const fetchUniversities = createAsyncThunk(
    'universities/fetchUniversities',
    async () => {
        const response = await apiClient.get('/');
        return response.data.universities;
    }
);

const universitySlice = createSlice({
    name: 'universities',
    initialState: {
        universities: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUniversities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUniversities.fulfilled, (state, action) => {
                state.loading = false;
                state.universities = action.payload;
            })
            .addCase(fetchUniversities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default universitySlice.reducer;
