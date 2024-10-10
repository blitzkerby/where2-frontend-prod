import PaginationButton from "./PaginationButton";
import { useNavigate } from "react-router-dom";

const Pagination = ({ totalPage, currentPage }) => {
    const navigate = useNavigate()

    console.log("total page",totalPage)
    console.log("current page",currentPage)

    const handlePageChange = (newPage) => {
        window.scrollTo(0,0)
        navigate(`/universities?page=${newPage}&limit=10`)
    };

    const handleNextClick = () => {
        if (currentPage < totalPage) {
            navigate(`/universities?page=${currentPage + 1}&limit=10`)
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            navigate(`/universities?page=${currentPage - 1}&limit=10`)
        }
    };

    return (
        <div className='flex items-center justify-center my-16 px-1 gap-[18px]'>

            <PaginationButton 
                type={'prev'} 
                onClick={() => handlePrevClick(currentPage - 1)}
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
                onClick={() => handleNextClick(currentPage + 1)}
                disabled={currentPage === totalPage}
                isActive={currentPage}
            />
        </div>
    );
};

export default Pagination;
