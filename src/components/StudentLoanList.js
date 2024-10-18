
import Card from "./reusable/Card";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";



const StudentLoanList = ({ studentLoans, page }) => {

    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (page === 1) {
                    dispatch(removedIsClicked());
                }
               await dispatch(getFavorite({ category: "loan", page, limit: 10 }));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);

    return (
    <>
    {studentLoans.map(loan => {
        return (
            <Card
                key={loan.loan_id}
                id={loan.loan_id}
                image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s'}
                imageAlt={loan.image_alt}
                title={loan.bank_name}
                description={loan.loan_type}
                interest={loan.interest_rate}
                loan_size={loan.loan_limit}
                currency={"KHR and USD"}
                term={loan.loan_term}
                // facebookLink={loan.updatedAt}
                // instagramLink={loan.updatedAt}
                // twitterLink={loan.createdAt}
                // youtubeLink={loan.createdAt}
                // websiteLink={loan.createdAt}
                location={loan.address}
                deadLine={loan.deadline}
                // timeOut={loan.salary}
                type={"loan"}
                route={loan.link}
                isHeartClicked={isClicked[loan.loan_id]}
                
            />)
        
    })}
    </>
);
};

export default StudentLoanList;