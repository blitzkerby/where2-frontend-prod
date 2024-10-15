import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneAccommodation } from "../features/slices/accommodationSlice";
import { LoadingOverlay } from "./reusable/Loading";
const AccommodationDetail = () => {
    const param = useParams();
    const dispatch = useDispatch();
    // const [accommodation, setAccommodation] = useState();
    const { loading, error, accommodation } = useSelector(state => state.accommodations);
    
     useEffect(() => {
         dispatch(getOneAccommodation(param.id))
         console.log("uniq   detail",accommodation)
    },[])
    console.log("uniq   detail", accommodation)
    if (!loading) {
       console.log(accommodation.id,accommodation.name)
    }
 
    return (
        <>
        {loading && <LoadingOverlay />}
        <div>
                
        </div>
         {error && <p>{error}</p>}
        </>
    )
};

export default AccommodationDetail;