import { useSelector,useDispatch } from "react-redux";
import Card from "./reusable/Card";
import { useEffect } from "react";
import { getFavorite } from "../features/slices/favoriteSlice";
const UniversityList = ({ universities }) => {
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    useEffect(() => {
        dispatch(getFavorite("university"))
    }, []);
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