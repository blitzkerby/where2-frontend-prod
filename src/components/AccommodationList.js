
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";
import Card from "./reusable/Card";
function useQuery() {
    return new URLSearchParams(useLocation().search);
} 
const AccommodationList = ({ accommodations }) => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({category:"accommodation",page,limit}))
    }, [page]);
    
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
                size={accommodation.size}
                price = {accommodation.price}
                address = {accommodation.location}
                // description={accommodation.accommodation_desc}
                // facebookLink={accommodation.updatedAt}
                // instagramLink={accommodation.updatedAt}
                // twitterLink={accommodation.createdAt}
                // youtubeLink={accommodation.createdAt}
                // websiteLink={accommodation.createdAt}
                // deadLine={accommodation.deadline}
                // timeOut={accommodation.salary}
                type={"accommodation"}
                isHeartClicked = {isClicked[accommodation.id]}
                route={`/accommodation-detail/${ accommodation.id }`}
            />)
        
    })}
    </>
);
};

export default AccommodationList;