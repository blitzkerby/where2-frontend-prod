import CardSlider from "./reusable/CardsSlider";
import PartTimeJob from '../assets/images/part-time-job.jpg';
import StudentLoan from '../assets/images/student-loan.jpeg';
import Accommodation from '../assets/images/accommodation.jpg';
import JobFinder from '../assets/images/job-finder.jpg';
import LiveliHood from '../assets/images/livelihood.png'
import LivelihoodBox from "./reusable/LivelihoodBox";
import { useState, useEffect } from "react";
import WrapperComponent from "./reusable/WrapperComponent";
const Livelihood = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
      
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const cards = [
        {
            title: "Part-time Job",
            image: PartTimeJob,
            path: "/jobs"
        },
        {
            title: "Student Loan",
            image: StudentLoan,
            path: "/student-loans"
        },
        {
            title: "Accommodation",
            image: Accommodation,
            path: "/accommodations"
        },
    ];
    return (
        <section className="bg-[#F4F8FA]">
            <div className="flex flex-col align-middle justify-center gap-6 p-6 mt-[64px] h-max">
                <img src={LiveliHood} alt="Hero photo of livelidhood page"/>
                <WrapperComponent>
                <CardSlider cards={cards} header={"Finish Graduation?"} />
                </WrapperComponent>
                <section className="flex gap-x-12 px-12 mx-auto mb-[64px]">
                    {isMobile ? null : <div className="flex-1 content-center">
                        <h1 className="text-[#367588] pb-[54px]"><b>Still Studying?</b></h1>
                        <img src={JobFinder} className="rounded-full w-96 h-96" />
                    </div>}
                    <div className="flex-1 content-center">
                        <div>
                            <WrapperComponent>
                            <LivelihoodBox title={"Part Time Job"} content={"Invest in your future. Discover part-time jobs that help fund your education goals."} />
                            <LivelihoodBox title={"Student Loan"} content={"Simplify your student loan journey. Explore refinancing options and get personalized advice."} />
                            <LivelihoodBox title={"Accommodation"} content={"Enhance your learning experience with the perfect living space. Find accommodations that inspire and support your academic journey."} />
                            </WrapperComponent>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Livelihood;