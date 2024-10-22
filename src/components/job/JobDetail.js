import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../features/slices/jobSlice";
import { useParams } from "react-router-dom";

import Gmail from "./../../assets/svg/gmail.svg";
import Website from "./../../assets/svg/website.svg";
import Telephone from "./../../assets/svg/telephone.svg";
import Location from "./../../assets/svg/location.svg";

import IconText from "../reusable/IconText";
import DetailText from "../reusable/DetailText";
import ContactCard from "../reusable/ContactCard";
import fetchProfile from "../reusable/functions/FetchProfile";

const JobDetail = () => {
    const dispatch = useDispatch();
    const { company, isLoading, error } = useSelector(state => state.job);
    const params = useParams();

    useEffect(() => {
        const fetchCreatorData = async () => {
            const creatorData = await fetchProfile();
            console.log(creatorData);
        };

        fetchCreatorData();
        dispatch(fetchCompany(params.jobId));
    }, [dispatch, params.jobId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading job details: {error}</p>;
    }

    let contact = (
        <>
            <IconText svg={Gmail} content={company?.data?.company?.email || "N/A"} />
            <IconText svg={Website} content={company?.data?.company?.website_url || "N/A"} />
            <IconText svg={Telephone} content={company?.data?.company?.tel || "N/A"} />
            <IconText svg={Location} content={company?.data?.company?.location || "N/A"} />
        </>
    );

    const companyProfile = company?.data?.company?.company_bg || "N/A";
    const jobDescription = company?.data?.job_desc || "N/A";
    const jobRequirement = company?.data?.job_require || "N/A";

    return (
        <>
            <div className={`lg:w-[676px] mt-[78px] flex-col mx-auto text-center `}>
                <h1 className="pb-6"><b>{company?.data?.company?.name || "Company Name"}</b></h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6qQYTiaG58zHg3LwPcbPaqOrkFmAschW8A&s" className="w-160 h-160 rounded-full mx-auto" />
            </div>
            <DetailText title={"Company Information"} content={companyProfile} />
            <DetailText title={"Job Description"} content={jobDescription} />
            <ContactCard title={"Job Requirement"} content={jobRequirement} />
            <ContactCard title={"Contact"} content={contact} />
        </>
    );
}

export default JobDetail;
