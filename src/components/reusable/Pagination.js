import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setCurrentPage } from "../../features/slices/universitySlice";

import PaginationButton from "./PaginationButton";

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {
    const dispatch = useDispatch();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlePageChange = (newPage) => {
      window.scrollTo(0,0)
      setIsButtonDisabled(true);
      debouncedAction(dispatch, setCurrentPage(newPage));
    };

    const handleNextClick = () => {
        if (currentPage < totalPage) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const debouncedAction = debounce((dispatch, action) => {
      dispatch(action);
      setIsButtonDisabled(false);
    }, 300);

    return (
        <div className='flex items-center justify-center my-16 px-1 gap-[18px]'>

            <PaginationButton 
                type={'prev'} 
                onClick={() => handlePrevClick(currentPage - 1)}
                disabled={currentPage === 1 || isButtonDisabled}
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
                                isActive={i === currentPage || isButtonDisabled}
                            />
                        );
                    }

                    return buttons;
                })()
            }

            <PaginationButton 
                type={'next'}
                onClick={() => handleNextClick(currentPage + 1)}
                disabled={currentPage === totalPage || isButtonDisabled}
                isActive={currentPage}
            />
        </div>
    );
};

export default Pagination;
