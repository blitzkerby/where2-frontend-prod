import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";

export const addFavorite = async (cardId, category) => {
    const user = JSON.parse(localStorage.getItem('authData'));
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