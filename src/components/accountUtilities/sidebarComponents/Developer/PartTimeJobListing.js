import config from "../../../../config";
import ListingComponent from "../../../reusable/ListingComponent";
import React , {useEffect , useState} from "react";
import { LoadingOverlay } from "../../../reusable/Loading";
import { useJobFunctions } from "../../../reusable/functions/JobAction";


const PartTimeJobListing = () => {
  const {JobFunctions} = useJobFunctions(); 
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllPartTimeJobs = async() => {
    try {
      const response = await fetch(config.job.getAllJob);
      if (!response.ok) {
        throw new Error("Failed to fetch part-time jobs");
      }
      const data = await response.json();
      setPartTimeJobs(data.data.jobs);
    }
    catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPartTimeJobs();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <ListingComponent
      data={partTimeJobs}
      title="Part-time Jobs"
      columns={["id", "company_id", "company_name"]}
      isLoading={loading}
      actions={JobFunctions}
      totalItems={partTimeJobs.length}
    />
  )
}
export default PartTimeJobListing
