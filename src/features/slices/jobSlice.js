import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchJob = createAsyncThunk("jobs/getjob", async () => {
    const response = await axios.get(config.job.getAllJob);

    return response.data;
});

export const fetchCompany = createAsyncThunk("jobs/associatedCompany", async (id) => {
    const response = await axios.get(config.job.getAssociatedCompany(id));

    return response.data;
})

const jobSlices = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        company: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJob.pending)
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.jobs = action.payload.data.jobs
            })
            .addCase(fetchJob.rejected)

            .addCase(fetchCompany.pending)
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.company = action.payload.data.associatedCompany

            })
            .addCase(fetchCompany.rejected)
    }
});

export default jobSlices.reducer;

