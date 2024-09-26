import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchJob = createAsyncThunk("jobs/getjob", async () => {
    const response = await axios.get(config.job.getAllJob);

    return response.data;
});

<<<<<<< HEAD
export const fetchCompany = createAsyncThunk("jobs/associatedCompany", async (id) => {
    const response = await axios.get(config.job.getAssociatedCompany(id));

    return response.data;
})

const jobSlices = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        company: {
            isLoading: true,
            data:{}
        }
    },
=======
const jobSlices = createSlice({
    name: "job",
    initialState: [],
>>>>>>> dd2381c (ft#7.1-job: added job slices)
    extraReducers: (builder) => {
        builder
            .addCase(fetchJob.pending)
            .addCase(fetchJob.fulfilled, (state, action) => {
<<<<<<< HEAD
                state.jobs = action.payload.data.jobs
            })
            .addCase(fetchJob.rejected)

            .addCase(fetchCompany.pending, (state, action) => {
                state.company.isLoading = true
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.company.isLoading = false
                state.company.data = action.payload.data.associatedCompany[0]

            })
            .addCase(fetchCompany.rejected)
=======
                state.push(action.payload)
            })
            .addCase(fetchJob.rejected)
>>>>>>> dd2381c (ft#7.1-job: added job slices)
    }
});

export default jobSlices.reducer;

