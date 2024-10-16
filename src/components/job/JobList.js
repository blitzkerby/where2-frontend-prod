
import Card from "../reusable/Card";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";



import { getFavorite } from "../../features/slices/favoriteSlice";
import { useLocation } from "react-router-dom";
import { removedIsClicked } from "../../features/slices/favoriteSlice";
function useQuery() {
    return new URLSearchParams(useLocation().search);
} 
const JobList = ({ jobs }) => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({category:"job",page,limit}))
    }, [page]);
    
    return (
    <>
    {jobs.map(job => {
        return(
            <Card
                key={job.id}
                id={job.id}
                image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s'}
                imageAlt={job.job_rquire}
                title={job.position}
                position={job.position}
                salary={job.salary}
                description={job.job_desc}
                // facebookLink={job.updatedAt}
                // instagramLink={job.updatedAt}
                // twitterLink={job.createdAt}
                // youtubeLink={job.createdAt}
                // websiteLink={job.createdAt}
                location={job.location}
                deadLine={job.deadline}
                timeOut={job.salary}
                type={"job"}
                isHeartClicked = {isClicked[job.id]}
                route={`/job-detail/${ job.id }`}
            />)
        
    })}
    </>
);
};

export default JobList;