import ListingComponent from "./reusable/ListingComponent";

const UniversityListing = () => {
  
      return (
        <ListingComponent
          title="UNIVERSITIES"
          data={universities}
          columns={["Name", "ID", "Listed Date", "Status"]}
          totalItems={universities.length}
        />
      );
  };

  export default UniversityListing