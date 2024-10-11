import PaginationButton from "./PaginationButton";
import { useNavigate } from "react-router-dom";

/** Enable for debugging */
const isDebug = false;

/**
 * Pagination Component
 * 
 * This component handles pagination logic and navigation for the university list.
 * 
 * @param {number} totalPage - The total number of pages available
 * @param {number} currentPage - The current page being viewed
 * @returns {JSX.Element} - Renders the pagination buttons
 */
const Pagination = ({ totalPage, currentPage }) => {
    const navigate = useNavigate();

    isDebug ? console.log("Pagination says: total page", totalPage) : null;
    isDebug ? console.log("Pagination says: current page", currentPage) : null;

    /**
     * handlePageChange
     * 
     * Navigates to the specified page and scrolls to the top of the window.
     * 
     * @param {number} newPage - The new page number to navigate to
     */
    const handlePageChange = (newPage) => {
        window.scrollTo(0, 0);
        navigate(`/universities?page=${newPage}&limit=10`);
    };

    /**
     * handleNextClick
     * 
     * Navigates to the next page if the current page is less than the total number of pages.
     */
    const handleNextClick = () => {
        if (currentPage < totalPage) {
            navigate(`/universities?page=${currentPage + 1}&limit=10`);
        }
    };

    /**
     * handlePrevClick
     * 
     * Navigates to the previous page if the current page is greater than 1.
     */
    const handlePrevClick = () => {
        if (currentPage > 1) {
            navigate(`/universities?page=${currentPage - 1}&limit=10`);
        }
    };

    return (
        <div className='flex items-center justify-center my-16 px-1 gap-[18px]'>

            <PaginationButton 
                type={'prev'} 
                onClick={handlePrevClick}
                disabled={currentPage === 1}
                isActive={currentPage}
            />

            {
                (() => {
                    const buttons = [];
                    const maxButtons = 7;
                    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                    let endPage = startPage + maxButtons - 1;

                    if (endPage > totalPage) {
                        endPage = totalPage;
                        startPage = Math.max(1, endPage - maxButtons + 1);
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        buttons.push(
                            <PaginationButton 
                                key={i}
                                type={'number'}
                                onClick={() => handlePageChange(i)}
                                currentNumber={Number(i)}
                                isActive={i === currentPage}
                            />
                        );
                    }

                    return buttons;
                })()
            }

            <PaginationButton 
                type={'next'}
                onClick={handleNextClick}
                disabled={currentPage === totalPage}
                isActive={currentPage}
            />
        </div>
    );
};

export default Pagination;
