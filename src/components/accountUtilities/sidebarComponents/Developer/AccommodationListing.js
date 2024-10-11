import ListingComponent from "../../../reusable/ListingComponent";

const AccommodationListing = () => {
  const accommodations = [
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    }
  ];
  
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