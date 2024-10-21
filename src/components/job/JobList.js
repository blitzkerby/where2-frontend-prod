
import Card from "../reusable/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavorite } from "../../features/slices/favoriteSlice";
import { removedIsClicked } from "../../features/slices/favoriteSlice";

const JobList = ({ jobs, page }) => {

    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (page === 1) {
                    dispatch(removedIsClicked());
                }
               await dispatch(getFavorite({ category: "job", page, limit: 10 }));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);

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
                route={`/detail/job/${job.id}`}
            />)
        
    })}
    </>
);
};

export default JobList;