// src/pages/UniversityPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { search } from '../features/slices/searchbarSlice';
import { fetchUniversities, setUniversities } from '../features/slices/universitySlice';

import { LoadingOverlay } from '../components/reusable/Loading';
import UniversityList from '../components/UniversityList';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import ListContainer from '../components/reusable/ListContainer';
import Pagination from '../components/reusable/Pagination';
import SearchBar from '../components/reusable/SearchBar';
import { setTotalPage } from '../features/slices/paginationSlice';



/** Enable for debugging */
const isDebug = true;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const UniversityPage = () => {
    const urlParams = useQuery();
    const page = parseInt(urlParams.get('page')) || 1;
    // const limit = 10;
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);
    const { totalPage } = useSelector((state) => state.pagination);

    if (isDebug) {
        console.log("UniversityPage says: page is", page);
        // console.log("UniversityPage says: limit is", limit);
        console.log("UniversityPage says: query is", searchQuery);
    }

    /**
     * useEffect Hook
     * 
     * Fetches universities based on current page and limit if no search query is provided.
     * If a search query is present, it triggers the search functionality.
     * 
     * @param {Function} dispatch - Redux dispatch function
     * @param {number} page - Current page number for pagination
     * @param {string} searchQuery - Current search query
     * @param {number} limit - Limit of items per page
     */
    useEffect(() => {
        if (searchQuery === "") {
            (isDebug) ? console.log("UniversityPage says : fetchingUniversities...") : null
            dispatch(fetchUniversities({ page }));
        } else {
            (isDebug) ? console.log("UniversityPage says : searching...") : null
            handleSearch(searchQuery);
        }

        if (isDebug) {
            console.log("UniversityPage says: total page is ", totalPage);
            console.log("UniversityPage says: search results are ", universities);
        }
    }, [dispatch, page, searchQuery]);

    useEffect(() => {

    })

    /**
     * handleSearch
     * 
     * Executes a search query to fetch universities matching the given search term.
     * The results are dispatched to update the universities list in the Redux store.
     * 
     * @param {string} query - The search term to query universities
     * @returns {Promise<Array|Error>} - Returns a promise that resolves to the fetched data or rejects with an error
     */
    const handleSearch = async (query) => {
        try {
            const data = await dispatch(search({ query, page, category: "university" })).unwrap();
            dispatch(setUniversities(data.universities || []));
            dispatch(setTotalPage(data.pagination.totalPages) || 1);
        } catch (error) {
            if (isDebug) {
                console.error('Error fetching data:', error);
            }
            throw error;
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-full flex justify-center min-h-screen lg:max-w-[980px] sm:w-[100%] mx-auto gap-[30px] lg:gap-[40px] mt-[248px] lg:mt-[276px] lg:w-[100%] grid sm:px-[35px]">
                {loading && <LoadingOverlay />}
                {error && <p>{error}</p>}
                <SearchBar handleSearch={handleSearch} searchPlaceholder="Search universities..." category="university"/>
                <UniversityList universities={universities} />
                <Pagination totalPage={totalPage} currentPage={page} category="university" searchQuery={searchQuery}/>
            </div>
            <Footer />
        </div>
    );
};

export default UniversityPage;
