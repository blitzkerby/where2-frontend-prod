
const DetailText = ({ title, content }) => {
    return (
        <div className={`lg:w-[676px] mt-[78px] flex flex-col mx-auto `}>
            <div className="pb-6 pt-6 ">
                <b>{title}</b>
            </div>
            <div className="">
                {content}
            </div>
    </div>)
};

export default DetailText;