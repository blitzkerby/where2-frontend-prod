import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchJob = createAsyncThunk("jobs/getjob", async () => {
    const response = await axios.get(config.job.getAllJob);

    return response.data;
});

const jobSlices = createSlice({
    name: "job",
    initialState:{data:[]},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJob.pending)
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.data = action.payload.data.jobs
            })
            .addCase(fetchJob.rejected)
    }
});

export default jobSlices.reducer;

