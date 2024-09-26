import { cardBody } from "./tailwindcardclass/cardClass"
const ContactCard = ({ title, content}) => {
    return (
        <div>
            <div className=" lg:w-[676px] mx-auto mb-[64px]">
                <div className={`${ cardBody } min-h-96`}>
                    <div className="px-24 py-12">
                        <h1><b>{title}</b></h1>
                        <div className="py-5">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;