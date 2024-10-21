import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAccommodation } from "../features/slices/accommodationSlice";
import { LoadingOverlay } from "./reusable/Loading";

const AccommodationDetail = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { loading, error, accommodation } = useSelector(state => state.accommodations);

    useEffect(() => {
        dispatch(fetchAccommodation(param.id))
 
    }, []);

    return (
        <>       
            {loading && <LoadingOverlay />}
            {!loading && <>
                <div className="mx-auto max-w-[1440px]">
                <h1 className="mt-[100px] mb-4 p-4"><b>{accommodation.type}</b></h1>
                <div className="flex gap-4 p-4">
                        <p>Rental Price:<span> ${accommodation.price}</span></p>
                    <p>Availability:<span> {accommodation.availability}</span></p>
                    </div>
                <div className="flex content-center p-4 mx-auto max-w-[1440px] ">
                <div className= "h-[250px] overflow-scroll">
                <div className="flex gap-4 min-w-[1400px]">
                    <div className="flex-1">
                    <img className="w-full rounded-lg h-[250px]" src={accommodation.image_url.img1} alt="room" />
                    </div>
                    <div className="flex-1">
                    <img className="w-full rounded-lg h-[250px]" src={accommodation.image_url.img2} alt="room" />
                    </div>
                    <div className="flex-1">
                    <img className="w-full rounded-lg h-[250px]" src={accommodation.image_url.img3} alt="room" />
                    </div>
                    <div className="flex-1">
                    <img className="w-full rounded-lg h-[250px]" src={accommodation.image_url.img4} alt="room" />
                    </div> 
                    </div>
                </div>
            </div>
                    <div className="p-4">
                    <h1><b>Details:</b></h1>
                            <ul>
                            <li>Size:<span> { accommodation.size}</span></li>
                            <li>Price:<span> ${accommodation.price}</span></li>
                                <li>Bed:<span> 1</span></li>
                        </ul>
                        <h1 className="py-4"><b>Contact:</b></h1>
                        <div>
                            <p>Location:<span> { accommodation.location}</span></p>
                            <p>Tel:<span> {accommodation.contact}</span></p>
                        </div>
                        <h1 className="py-4"><b>Notes:</b></h1>
                        <div>
                            <p>{ accommodation.description}</p>
                        </div>
                    </div>
                </div>
            
        </>}
         {error && <p>{error}</p>}
        </>
    )
};

export default AccommodationDetail;