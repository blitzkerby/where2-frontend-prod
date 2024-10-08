import Rocket from './../../assets/svg/rocket.svg';
const LivelihoodBox = ({ title, content }) => {
    return (
        <div className="lg:w-[676px] mt-[24px] border border-cyan-400 rounded-[50px] bg-white h-[160px] p-[24px] content-center text-[#367588]">
            <div className="flex justify-between mb-4 sm:mb-0">
                <h1><b>{title}</b></h1>
                <img src={Rocket} />
            </div>
            <div className="overflow-hidden max-h-80 ">
                {content}
            </div>
        </div>
    );
};

export default LivelihoodBox;