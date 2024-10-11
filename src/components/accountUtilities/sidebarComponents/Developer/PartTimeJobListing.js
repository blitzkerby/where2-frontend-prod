import ListingComponent from "../../../reusable/ListingComponent";

const PartTimeJobListing = () => {
  const jobs = [
    {
      id: 1,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 2,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 3,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 4,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 5,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
  ];
  return (
    <ListingComponent
      title="PART-TIME JOBS"
      data={jobs}
      columns={["Title", "Company", "Location", "Salary"]}
      totalItems={jobs.length}
    />
  );
};
export default PartTimeJobListing
