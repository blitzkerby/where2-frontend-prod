import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


export const getOneAccommodation = createAsyncThunk("/accommodation", async (id) => {
    const accommodation = await axios.get(config.accommodation.getOneAccommodation(id));

    return accommodation;
});

const accommodationSlices = createSlice({
    name: "accommodation",
    initialState: { loading: true, error: null, accommodation: [] },
    extraReducers: (builder) => {
        builder
            .addCase(getOneAccommodation.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneAccommodation.fulfilled, (state, action) => {
                state.loading = false;
                state.accommodation = action.payload.data.oneAccommodation
            })
            .addCase(getOneAccommodation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default accommodationSlices.reducer;