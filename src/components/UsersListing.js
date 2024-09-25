import ListingComponent from "./reusable/ListingComponent";
const UserListing = () => {
    const users = [
      {
        id: 1,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 2,
        name: "Jay Z",
        role: "Admin",
        email : "admin@gmail.com"
      },
      {
        id: 3,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 4,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
      {
        id: 5,
        name: "Jay Z",
        role: "user",
        email : "admin@gmail.com"
      },
    ];
    return (
      <ListingComponent
        title="USER LISTING"
        data={users}
        columns={["Name", "Email", "Role" ]}
        totalItems={users.length}
        additionalStats={[
          { label: "Total Admins", value: users.filter(user => user.role === "Admin").length }
        ]}
      />
    );
  };

  export default UserListing