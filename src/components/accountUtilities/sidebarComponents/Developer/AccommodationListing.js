import ListingComponent from "../../../reusable/ListingComponent";

const AccommodationListing = () => {
  
  return (
    <ListingComponent
      title="ACCOMMODATIONS"
      data={accommodations}
      columns={["Name", "Type", "Location", "Price"]}
      totalItems={accommodations.length}
    />
  );
};

export default AccommodationListing