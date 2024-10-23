import config from "../../../../config";
import ListingComponent from "../../../reusable/ListingComponent";
import React, { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../reusable/Loading";
import { useJobFunctions } from "../../../reusable/functions/JobAction";
import ButtonComponent from "../../../reusable/Button";

const PartTimeJobListing = () => {
  const { JobFunctions } = useJobFunctions();
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showApproved, setShowApproved] = useState(false); // Toggle between approved/unapproved

  const getAllPartTimeJobs = async () => {
    try {
      const response = await fetch(config.job.getAllJob);
      if (!response.ok) {
        throw new Error("Failed to fetch part-time jobs");
      }
      const data = await response.json();
      setPartTimeJobs(data.data.jobs);
      setFilteredJobs(data.data.jobs); // Default to showing all jobs
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPartTimeJobs();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }
  const showAllPost = () =>{
    setFilteredJobs(partTimeJobs);
  }

  const toggleApproval = () => {
    setShowApproved(!showApproved); // Toggle between approved/unapproved

    // Filter jobs based on the toggle state
    if (showApproved) {
      const unapprovedJobs = partTimeJobs.filter(job => job.isApproved === false);
      setFilteredJobs(unapprovedJobs);
    } else {
      const approvedJobs = partTimeJobs.filter(job => job.isApproved === true);
      setFilteredJobs(approvedJobs);
    }
  };

  return (
    <main>
      <ButtonComponent onClick={toggleApproval}>
        {showApproved ? "Show Unapproved Posts" : "Show Approved Posts"}
      </ButtonComponent>
      <ButtonComponent onClick={() => showAllPost()}>
        Show All Posts
      </ButtonComponent>

      <ListingComponent
        data={filteredJobs}
        title={showApproved ? "Approved Part-time Jobs" : "Unapproved Part-time Jobs"}
        columns={["id", "company_id", "company_name"]}
        isLoading={loading}
        actions={JobFunctions}
        totalItems={filteredJobs.length}
      />
    </main>
  );
};

export default PartTimeJobListing;
