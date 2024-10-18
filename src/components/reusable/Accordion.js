
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import AccordionButton from "./AccordionButton";

function Accordion({ items , onUniversityFilterChange }) {
  console.log("Accordion says: ", items)

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
  };

  const renderItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const icon = <span>{isExpanded ? <GoChevronUp /> : <GoChevronDown />}</span>;

    return (
      <div key={item.id}>
        <div
          className="flex justify-between p-3 h-[80px] items-center cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && Array.isArray(item.content) &&(
					<div className="md:w-[300] flex flex-col md:flex-row p-2 overflow-x-auto">
						{
            item.content.map((contentItem, contentIndex) => (
              <AccordionButton contentItem={contentItem} key={contentIndex} applyFilter={onUniversityFilterChange()}/>
						))}
					</div>
				)
          
        }
      </div>
    );
  });

  return <div className="rounded">{renderItems}</div>;
}

export default Accordion;