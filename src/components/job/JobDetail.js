<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCompany } from "../../features/slices/jobSlice";
import ContactCard from "../reusable/ContactCard";
import DetailText from "../reusable/DetailText";
const JobDetail = () => {
    const dispatch = useDispatch();
    const {company } = useSelector(state => state.job);

    useEffect(() => {
        dispatch(fetchCompany(7));

    }, [])
    // console.log("this is company with job 7", company);
    // company.map(x => console.log(x.company.company_bg))

    
    return (
        <>
            <div className={`lg:w-[676px] mt-[78px] flex-col mx-auto text-center `}>
                <h1 className="pb-6"><b>Amazon Cafe</b></h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s" className="w-40 h-40 rounded-full mx-auto"/>
            </div>
            <DetailText title={"Company Information1"} content={"This is Company Content1"}/>
            <DetailText title={"Company Information"} content={"This is Company Content"}/>
            <ContactCard title={"Contact1"} content={"Content hgere1"}/>
            <ContactCard title={"Contact"} content={"Content hgere"}/>
        </>
=======
const JobDetail = () => {
    return (
        <div>
            this is detail page
        </div>
>>>>>>> 692fc12 (ft#7.1-job: added the job detail component and job detail page)
    )
};

export default JobDetail;