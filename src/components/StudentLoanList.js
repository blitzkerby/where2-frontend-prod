
import Card from "./reusable/Card";
import { useDispatch, useSelector } from "react-redux";
// import { fetchJob } from "../../features/slices/jobSlice";
import { useEffect } from "react";
// import { setCurrentPage, selectCurrentPage, selectItemsPerPage, selectTotalItems } from '../../features/slices/paginationSlice';
// import PaginationComponent from "../reusable/Pagination";
// import { addFavorite } from "../../features/slices/favoriteSlice";
const StudentLoanList = ({studentLoans}) => {
    return (
    <>
    {studentLoans.map(loan => {
        return(
            <Card
                key={loan.loan_id}
                id={loan.loan_id}
                image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s'}
                imageAlt={loan.image_alt}
                title={loan.bank_name}
                description={loan.loan_type}
                // facebookLink={loan.updatedAt}
                // instagramLink={loan.updatedAt}
                // twitterLink={loan.createdAt}
                // youtubeLink={loan.createdAt}
                // websiteLink={loan.createdAt}
                location={loan.address}
                deadLine={loan.deadline}
                // timeOut={loan.salary}
                type={"loan"}
                route={`/loan-detail`}
            />)
        
    })}
    </>
);
};

export default StudentLoanList;