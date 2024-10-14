import ListingComponent from "./reusable/ListingComponent";

const UniversityListing = () => {
  
      return (
        <ListingComponent
          title="UNIVERSITIES"
          columns={["Name", "ID", "Listed Date", "Status"]}
        />
      );
  };

  export default UniversityListing
