import { useSelector,useDispatch } from "react-redux";
import Card from "./reusable/Card";
import { useEffect } from "react";
import { getFavorite } from "../features/slices/favoriteSlice";
import { useLocation, useParams } from "react-router-dom";
import { removedIsClicked } from "../features/slices/favoriteSlice";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}  
const UniversityList = ({ universities }) => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;

    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
 
    console.log("this is page university",page)
    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({category: "university",  page, limit }));
    }, [page]);
    if (universities[0] == "No results found") {
        return null;
    }
    console.log(universities)


    return (
        <>
            {universities.map((university, index) => (
                <Card
                    key={index}
                    image={university.image_url}
                    imageAlt={university.image_alt}
                    title={university.name}
                    description={university.description}
                    facebookLink={university.facebook_url}
                    instagramLink={university.instagram_url}
                    telegramLink={university.telegram_url}
                    websiteLink={university.website}
                    location={university.location}
                    id={university.id}
                    type={'university'}
                    route={`${ university.id }`}
                    isHeartClicked = {isClicked[university.id]}
                />
            ))}
        </>

    )
}

export default UniversityList;