import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/reusable/Footer"
import Navbar from "../components/reusable/Navbar"
import { useEffect } from "react";
import { fetchAllList } from "../features/slices/paginationSlice";
import Pagination from "../components/reusable/Pagination";
import ListContainer from "../components/reusable/ListContainer";
import { useLocation } from 'react-router-dom';
import { LoadingOverlay } from "../components/reusable/Loading";
import AccommodationList from "../components/AccommodationList";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}  
const AccommodationPage = () => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { data, loading, error, totalPage } = useSelector((state) => state.pagination);
console.log("AccommodationList", data)
    useEffect(() => {
        dispatch(fetchAllList({page,limit,model: 'Accommodation'}))
    },[dispatch, page])
    return (
        <div>
            <Navbar />
            <ListContainer>
            {loading && <LoadingOverlay/>}
            {error && <p>{error}</p>}
            <AccommodationList accommodations={data} />
            </ListContainer>
            <Pagination totalPage={totalPage} currentPage={page} route={'accommodations'}/>
            <Footer />
        </div>
    )
};

export default AccommodationPage;