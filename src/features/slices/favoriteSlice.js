import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const user = JSON.parse(localStorage.getItem('authData'));
export const addFavorite = async (cardId, category) => {
        const addFavorite =  await axios.post(
            config.favorite.addFavorite,
            {
                user_id: user.id,
                card: cardId,
                categories: category
            }
        );
    return cardId
};

export const getFavorite = createAsyncThunk("getFavorite", async ({ category, page, limit }) => {
    const getAllFavorite = await axios.get(`${ config.favorite.getFavorite(user.id, category) }?page=${ page }&limit=${ limit }`);
    return getAllFavorite;
});

export const removeFavorite = async (cardId,category) => {
    const removed = await axios.delete(config.favorite.removedFavorite(cardId, category));
    return removed;
}

const FavoriteSlices = createSlice({
    name: "favorite",
    initialState: { isLoading:{ 'job': true, 'university': true, 'loan': true, 'scholarship':true,'accommodation':true}, favorites: [], isClicked: {},error:null},
    reducers: {
        setIsClicked(state, action) {
            state.isClicked[`${ action.payload.id }`] = !state.isClicked[`${ action.payload.id }`];
            console.log("IsClicked", state.isClicked)
        },
        removedIsClicked(state, action) {
            state.isClicked = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavorite.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                state.favorites = [];
                console.log("Pending is called")
            })
            .addCase(getFavorite.fulfilled, (state, action) => {
                state.favorites = action.payload.data.data.allFavorite;
                state.isLoading = false;
                // state.isClicked = {};
                state.favorites.map(fav => {
                    if (fav.categories === 'university') {
                        state.isLoading = {
                            'job': true, 'university': false, 'loan': true, 'scholarship': true, 'accommodation': true
                        };
                        state.favorites.map(fav => {
                            state.isClicked[`${ fav.university.id }`] = true
                        });
                        
                    } else if (fav.categories === 'job') {
                        state.isLoading = {
                            'job': false, 'university': true, 'loan': true, 'scholarship': true, 'accommodation': true
                        };
                        state.favorites.map(fav => {
                            state.isClicked[`${ fav.job.id }`] = true
                        });
                     
                       
                    } else if (fav.categories === 'loan') {
                        state.isLoading = {
                            'job': true, 'university': true, 'loan': false, 'scholarship': true, 'accommodation': true
                        };
                        state.favorites.map(fav => {
                            state.isClicked[`${ fav.loan.loan_id }`] = true
                        });
                      
                     
                    } else if (fav.categories === 'scholarship') {
                        state.isLoading = {
                            'job': true, 'university': true, 'loan': true, 'scholarship': false, 'accommodation': true
                        };
                        state.favorites.map(fav => {
                            state.isClicked[`${ fav.scholarship.id }`] = true
                        });
                      
                    } else if (fav.categories === 'accomodation') {
                        state.isLoading = {
                            'job': true, 'university': true, 'loan': true, 'scholarship': true, 'accommodation': false
                        };
                        state.favorites.map(fav => {
                            state.isClicked[`${ fav.accommodation.id }`] = true
                        });
                    }
                });
            
              
            })
            .addCase(getFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            ;
      
    }
}
    
);
export const { setIsClicked, setIsLoading, removedIsClicked} = FavoriteSlices.actions;
export default FavoriteSlices.reducer;