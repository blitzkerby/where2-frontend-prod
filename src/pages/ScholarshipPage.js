import React from "react";
import ScholarshipList from "../components/ScholarshipList";
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "../components/reusable/Pagination";
import { fetchAllList } from "../features/slices/paginationSlice";
import Footer from "../components/reusable/Footer";
import ListContainer from "../components/reusable/ListContainer";
import Navbar from "../components/reusable/Navbar";
import { LoadingOverlay } from "../components/reusable/Loading";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}  
const ScholarshipPage = () => {
	const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { data, loading, error, totalPage } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchAllList({page,limit,model: 'Scholarship'}))
    },[dispatch, page])
	return (
		<div>
			<Navbar />
            <ListContainer>
            {loading && <LoadingOverlay/>}
            {error && <p>{error}</p>}
			<ScholarshipList scholarship={data} />
			</ListContainer>
			<Pagination totalPage={totalPage} currentPage={page} route={'scholarships'} />
			<Footer />
		</div>
	)
}
 export default ScholarshipPage;