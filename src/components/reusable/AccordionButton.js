import React from "react";

const AccordionButton = ({ applyFilter , contentItem }) => {
    function handleClick() {
        console.log("AccordionButton says: applying filter...")
        applyFilter()
    }

    return (
        <div className="p-5">
            <div className="bg-[#A9EBFF] w-fit border rounded-full px-2 cursor-pointer drop-shadow-lg"
                onClick={ handleClick }
            >
                {contentItem}
            </div>
        </div>
    );
};

export default AccordionButton;
