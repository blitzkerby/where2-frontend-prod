import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCompany } from "../../features/slices/jobSlice";
const JobDetail = () => {
    const dispatch = useDispatch();
    const {company } = useSelector(state => state.job);

    useEffect(() => {
        dispatch(fetchCompany(7));

    }, [])
    console.log("this is company with job 7", company);
    // company.map(x => console.log(x.company.company_bg))

    
    return (
        <div>
            this is detail page
        </div>
    )
};

export default JobDetail;