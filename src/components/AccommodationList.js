
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";
import Card from "./reusable/Card";

const AccommodationList = ({ accommodations, page }) => {
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (page === 1) {
                    dispatch(removedIsClicked());
                }
               await dispatch(getFavorite({ category: "accommodation", page, limit: 10 }));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);
    
    return (
    <>
    {accommodations.map(accommodation => {
        return(
            <Card
                key={accommodation.id}
                id={accommodation.id}
                image={'https://th.bing.com/th/id/R.5a8394ded8bc846fa7be1d13d7ff568b?rik=eAfE14B5fVvw4A&pid=ImgRaw&r=0'}
                imageAlt={"room"}
                title={accommodation.name}
                price = {accommodation.price}
                location={accommodation.location}
                description={accommodation.description}
                // facebookLink={accommodation.updatedAt}
                // instagramLink={accommodation.updatedAt}
                // twitterLink={accommodation.createdAt}
                // youtubeLink={accommodation.createdAt}
                // websiteLink={accommodation.createdAt}
                // deadLine={accommodation.deadline}
                // timeOut={accommodation.salary}
                type={"accommodation"}
                isHeartClicked = {isClicked[accommodation.id]}
                route={`/detail/accommodation/${ accommodation.id }`}
            />)
        
    })}
    </>
);
};

export default AccommodationList;