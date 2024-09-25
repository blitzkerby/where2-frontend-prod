import ListingComponent from "./reusable/ListingComponent";

const UniversityListing = () => {
    const universities = [
      {
        id: 1,
        name: "University of Washington",
        status: "Requested",
        email : "admin@gmail.com",
        listedDate: "12/09/2024",
      },
      {
        id: 2,
        name: "University of Cambodia",
        listedDate: "12/09/2024",
        status: "Approved",
      },
      {
        id: 3,
        name: "University of Washington",
        status: "Requested",
        listedDate: "12/09/2024",
        email : "admin@gmail.com"
      },
      {
        id: 4,
        name: "University of Washington",
        status: "Requested",
        listedDate: "12/09/2024",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "University of Washington",
        status: "Requested",
        email : "admin@gmail.com",
        listedDate: "12/09/2024",
      },
      {
        id: 5,
        name: "University of Washington",
        status: "Requested",
        email : "admin@gmail.com",
        listedDate: "12/09/2024",
      },
      {
        id: 5,
        name: "University of Washington",
        status: "Requested",
        email : "admin@gmail.com",
        listedDate: "12/09/2024",
      },
    ];
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