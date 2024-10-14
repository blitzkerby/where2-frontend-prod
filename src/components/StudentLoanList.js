
import Card from "./reusable/Card";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getFavorite } from "../features/slices/favoriteSlice";
import { useLocation } from "react-router-dom";
import { removedIsClicked } from "../features/slices/favoriteSlice";
function useQuery() {
    return new URLSearchParams(useLocation().search);
} 
const StudentLoanList = ({ studentLoans }) => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    console.log("this is page StudentLoan", page)
    console.log("this is isClicked favorite",isClicked)
    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({ category: "loan", page, limit }))
        
    }, [page]);
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
                isHeartClicked={isClicked[loan.loan_id]}
                
            />)
        
    })}
    </>
);
};

export default StudentLoanList;