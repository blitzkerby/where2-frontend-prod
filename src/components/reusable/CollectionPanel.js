import React, { useState, useEffect, useCallback } from "react";
import { Edit2, Eye, EyeOff } from "lucide-react";
import { Menu } from "lucide-react";
import { companies } from "./../db";
import FavoriteCard from "./FavoriteCard";
import { useDispatch,useSelector } from "react-redux";
import { getFavorite,setIsLoading } from "../../features/slices/favoriteSlice";
import { LoadingOverlay } from "./Loading";
import FavoriteList from "./FavoriteList";


const CollectionPanel = ({ category }) => {
    let renderFavorite;
    const dispatch = useDispatch();
    // const [categories, setCategories] = useState(true);
    let {isLoading, favorites,error } = useSelector(state => state.favorites);
    // let { isLoading } = useCallback(useSelector(state => state.favorites));
    // console.log("First isLoading", isLoading)
    console.log("First favorites", favorites);
    console.log("First isLoading", isLoading);
    // dispatch(setIsLoading())
    // let { favorites } = useSelector(state => state.favorites);
   
//     useEffect(() => {
//         dispatch(setIsLoading())
//         console.log("I am called under if")
    //    },[category])
    // setTimeout(
    //     dispatch(setIsLoading())
    // ,5000)
    useEffect(() => {
        dispatch(getFavorite(category));
        // setCategories(false)
        console.log("inside useEffect", favorites)
        // console.log("isloading in UseEffect", isLoading)
    }, [category]);
    
    // if (!isLoading[`${category}`]) {
        // dispatch(setIsLoading())
        // if (category === "job"){
        // favorites = favorites.map(fav => fav.job)
        //     console.log('new favorite job', favorites);
        //     console.log('new isLoading job',isLoading);
        //  renderFavorite = favorites.map((job) => (
        //     <FavoriteCard
        //         key={job.id}
                // title={job.title}
                // description={job.job_desc}
                //   facebookLink={job.facebookLink}
                //   instagramLink={job.instagramLink}
                //   twitterLink={job.twitterLink}
                //   youtubeLink={job.youtubeLink}
                //   websiteLink={job.websiteLink}
        //         location={job.location}
        //         deadLine={job.deadLine}
        //         timeOut={job.salary}
        //     />
        //  ));
            // dispatch(setIsLoading());
            
        // } else if (category === "university") {
        //     favorites = favorites.map(fav => fav.university)
        //     console.log('new favorite university', favorites);
        //     console.log('new isLoading university',isLoading);
        //      renderFavorite = favorites.map((university) => (
        //         <FavoriteCard
        //             key={university.id}
        //             title={university.name}
        //             description={university.description}
        //             facebookLink={university.facebook_url}
        //             instagramLink={university.instagram_url}
                    //   twitterLink={university.twitterLink}
                    //   youtubeLink={university.youtubeLink}
                    //   websiteLink={university.website_url}
                    // location={university.location}
                    // deadLine={university.deadLine}
                    // timeOut={university.salary}
            //     />
            //  ));
            //  dispatch(setIsLoading());
        // };
       
    // } else {
        // isLoading = false;
    //     console.log("Favorite is loading _isLoading_",isLoading)
    //     console.log("Im pending")
    // }
  
    

    return (
        <div className="mt-[100px]">
            <div className="max-w-7xl mx-auto flex-col  justify-between flex p-6 bg-white rounded-3xl shadow-lg border-2  w-full ">
          <h1 className="text-3xl font-bold mb-6">Collections</h1>
          
                <div className="max-w-7xl mx-auto flex-col gap-y-8 justify-between flex p-6 bg-white rounded-3xl shadow-inner border-2  w-full overflow-hidden max-h-[1000px] overflow-y-scroll">
                    {isLoading[`${category}`] ? <LoadingOverlay /> : <FavoriteList favorites={favorites} category={category} />}
                    {/* {!isLoading?<FavoriteList favorites={favorites} category={category} />:null} */}
                    {error && <p>{error}</p>}
                    
                    
            </div>

            </div>
            </div>
        
    );
};

export default CollectionPanel;