import JobList from "../components/job/JobList"
import Footer from "../components/reusable/Footer"
import Navbar from "../components/reusable/Navbar"

const JobPage = () => {
    return (
        <div>
            <Navbar />
            <JobList />
            <Footer />
        </div>
    )
};

export default JobPage;