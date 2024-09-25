<<<<<<< HEAD
import Card from "../reusable/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchJob } from "../../features/slices/jobSlice";
import { useEffect } from "react";
const JobList = () => {
    const dispatch = useDispatch();
    const {jobs }= useSelector((state) => state.job);

    useEffect(() => {
     dispatch(fetchJob());
    }, []);
   
    const renderJobCards = jobs.map(job => {
        return <Card
        key={job.id}
        id={job.id}
        image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s'}
        imageAlt={job.job_rquire}
        title={job.position}
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
    />
    })

  
    

    return (
        <div>
          {renderJobCards}
=======
import Card from "../reusable/Card"

const JobList = () => {
    return (
        <div>
            <Card />
>>>>>>> 77c00a4 (ft#7.1-job: added JobList, JobPage and the path for job)
        </div>
    )
};

export default JobList;