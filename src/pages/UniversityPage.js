// src/pages/UniversityPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOverlay } from '../components/reusable/Loading';
import UniversityList from '../components/UniversityList';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import ListContainer from '../components/reusable/ListContainer';
import Pagination from '../components/reusable/Pagination';
import SearchBar from '../components/reusable/SearchBar';
import { searchUniversities, setUniversities } from '../features/slices/searchbarSlice';
import { fetchUniversities } from '../features/slices/universitySlice';
import { useLocation } from 'react-router-dom';
import { fetchAllList } from '../features/slices/paginationSlice';

/** Enable for debugging */
const isDebug = true;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}  

const UniversityPage = () => {
    const urlParams = useQuery();
    const page = parseInt(urlParams.get('page')) || 1;
    const searchQuery = urlParams.get('q') || '';
    const limit = parseInt(urlParams.get('limit')) || 10;

    if (isDebug) {
        console.log("UniversityPage says: page is", page);
        console.log("UniversityPage says: query is", searchQuery);
        console.log("UniversityPage says: limit is", limit);
    }

    const dispatch = useDispatch();
    const { totalPage, data, loading, error } = useSelector((state) => state.pagination);

    useEffect(() => {
        if (!searchQuery) {
            dispatch(fetchAllList({ page, limit, model: 'University' }));
        } else {
            handleSearch(searchQuery, page);
        }
    }, [dispatch, page, searchQuery, limit]);

    const handleSearch = (query, currentPage) => {
        // Dispatch the search action, assuming it returns a promise
        dispatch(searchUniversities({ query, page: currentPage }))
            .unwrap()
            .then(data => {
                dispatch(setUniversities(data)); // Update the universities list with search results
            })
            .catch(error => {
                if (isDebug) console.error('Error fetching data:', error);
                // Handle error if needed
            });
    };

    return (
        <>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {error && <p className="text-red-500">{error}</p>}
                <SearchBar handleSearch={handleSearch} searchPlaceholder="Search universities..." />
                <UniversityList universities={data} />
                <Pagination totalPage={totalPage} currentPage={page} route={'universities'} />
            </ListContainer>
            <Footer />
        </>
    );
};

export default UniversityPage;

