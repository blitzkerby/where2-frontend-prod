import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";

const user = JSON.parse(localStorage.getItem('authData'));
export const addFavorite = async (cardId, category) => {
    const addFavorite = await axios.post(
        config.favorite.addFavorite,
        {
            user_id: user.id,
            card: cardId,
            categories: category
        }
    );

    return addFavorite
};

export const getFavorite = createAsyncThunk("getFavorite", async (category) => {
    const getAllFavorite = await axios.get(config.favorite.getFavorite(user.id, category));
    console.log(getAllFavorite)
    return getAllFavorite;
});

const FavoriteSlices = createSlice({
    name: "favorite",
    initialState: { isLoading: true, favorites: {} },
    extraReducers: (builder) => {
        builder.addCase(getFavorite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.favorites = action.payload.data.data.allFavorite
        })
    }
}
    
);

export default FavoriteSlices.reducer;