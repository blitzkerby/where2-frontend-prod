import { useEffect , useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import jobSlice, { fetchCompany } from "../../features/slices/jobSlice";

import { useParams } from "react-router-dom";

import Gmail from "./../../assets/svg/gmail.svg";
import Website from "./../../assets/svg/website.svg";
import Telephone from "./../../assets/svg/telephone.svg";
import Location from "./../../assets/svg/location.svg";

import { Cpu } from "lucide-react";
import IconText from "../reusable/IconText";

import DetailText from "../reusable/DetailText";
import ContactCard from "../reusable/ContactCard";

const JobDetail = () => {
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.job);
    const params = useParams();
    let contact;
    let companyProfile;
    let jobDescription;
    let jobRequirement

    useEffect(() => {
        dispatch(fetchCompany(params.jobId));
    }, []);
    if (!company.isLoading) {
        contact = (<>
            <IconText svg={Gmail} content={company.data.company.email} />
            <IconText svg={Website} content={company.data.company.website_url} />
            <IconText svg={Telephone} content={company.data.company.tel} />
            <IconText svg={Location} content={company.data.company.location} />
        </>
        );
        companyProfile = company.data.company.company_bg;
        jobDescription = company.data.job_desc;
        jobRequirement = company.data.job_require;
    };

    return (
        <>
            <div className={`lg:w-[676px] mt-[78px] flex-col mx-auto text-center `}>
                <h1 className="pb-6"><b>Amazon Cafe</b></h1>
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