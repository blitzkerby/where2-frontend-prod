import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";

import { useQuery } from '../utils/useQuery';

import { fetchAllList } from "../features/slices/paginationSlice";
import { fetchScholarships, searchScholarships } from '../features/slices/scholarshipsSlice';

import { LoadingOverlay } from "../components/reusable/Loading";

import ScholarshipList from "../components/ScholarshipList";

import Footer from "../components/reusable/Footer";
import Navbar from "../components/reusable/Navbar";
import SearchBar from '../components/reusable/SearchBar';
import Pagination from "../components/reusable/Pagination";
import ListContainer from "../components/reusable/ListContainer";

/** Enable for debugging */
const isDebug = true;

const ScholarshipPage = () => {
	const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    const { scholarships, loading, error } = useSelector((state) => state.scholarships) 
    const { totalPage } = useSelector((state) => state.pagination);

    useEffect(() => {
        if (searchQuery === ""){
            dispatch(fetchScholarships({ page }))
        } else {
            dispatch(searchScholarships({ page, query: searchQuery }))
        }
    }, [dispatch, page, searchQuery])

	return (
		<div>
			<Navbar />
            <ListContainer>
                {loading && <LoadingOverlay/>}
                {/* {error && <p>{error}</p>} */}

                <SearchBar handleSearch={searchScholarships} searchPlaceholder="Search scholarships..." category="scholarship"/>
                <ScholarshipList scholarship={scholarships} />
			    <Pagination totalPage={totalPage} currentPage={page} category={'scholarship'} searchQuery={searchQuery}/>
			</ListContainer>
			<Footer />
		</div>
	)
}
 export default ScholarshipPage;