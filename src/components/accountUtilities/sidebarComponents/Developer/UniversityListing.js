import config from "../../../../config";
import ListingComponent from "../../../reusable/ListingComponent";
import React, { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../reusable/Loading";
import { useUniversityFunctions } from "../../../reusable/functions/UniversityFunctions";

const UniversityListing = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { UniversityFunctions } = useUniversityFunctions();

  const getAllUniversities = async () => {
    try {
      const response = await fetch(config.universities.getUniversityList);
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      const data = await response.json();
      setUniversities(data.universities || []);  
      console.log(universities.length)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUniversities();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!universities || universities.length === 0) {
    return <div>No universities found.</div>;
  }

  return (
    <ListingComponent
      title="UNIVERSITY LISTING"
      data={universities}
      columns={["id", "email", "name", "role"]}
      totalItems={universities.length}
      actions={UniversityFunctions}
    />
  );
};

export default UniversityListing;