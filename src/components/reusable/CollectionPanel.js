import React, { useState, useEffect } from "react";
import { Edit2, Eye, EyeOff } from "lucide-react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
// import { fetchData } from "../../data/fetchData";
// import addFavorite from "../../features/slices/functions/addFavorite";
// import Card from "./CompanyCard";
import { companies } from "./../db";
import FavoriteCard from "./FavoriteCard";
import { useDispatch,useSelector } from "react-redux";
import { getFavorite } from "../../features/slices/favoriteSlice";


const CollectionPanel = ({category}) => {
    const dispatch = useDispatch();
    let { isLoading, favorites } = useSelector(state => state.favorites);
    let renderFavorite;
    useEffect(() => {
        dispatch(getFavorite(category))
    }, [category]);
    if (!isLoading) {
        favorites = favorites.map(fav => fav.job)
        console.log('new favorite',favorites);
         renderFavorite = favorites.map((job) => (
            <FavoriteCard
                key={job.id}
                title={job.title}
                description={job.job_desc}
                //   facebookLink={job.facebookLink}
                //   instagramLink={job.instagramLink}
                //   twitterLink={job.twitterLink}
                //   youtubeLink={job.youtubeLink}
                //   websiteLink={job.websiteLink}
                location={job.location}
                deadLine={job.deadLine}
                timeOut={job.salary}
            />
        ));
    } else {
        console.log("Favorite is loading")
    }
 

    return (
        <div className="mt-[100px]">
            <div className="max-w-7xl mx-auto flex-col  justify-between flex p-6 bg-white rounded-3xl shadow-lg border-2  w-full ">
          <h1 className="text-3xl font-bold mb-6">Collections</h1>
          
          <div className="max-w-7xl mx-auto flex-col gap-y-8 justify-between flex p-6 bg-white rounded-3xl shadow-inner border-2  w-full overflow-hidden max-h-[1000px] overflow-y-scroll">
          {renderFavorite}
            </div>

            </div>
            </div>
        
    );
};

export default CollectionPanel;