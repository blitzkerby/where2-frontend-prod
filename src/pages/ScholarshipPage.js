import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryParams } from '../hooks/useQueryParams';

import { fetchScholarships, searchScholarships } from '../features/slices/scholarshipsSlice';

import { LoadingOverlay } from '../components/reusable/Loading';

import ScholarshipList from '../components/ScholarshipList';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Filter from '../components/reusable/Filter';
import SearchBar from '../components/reusable/SearchBar';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';

/** Enable for debugging */
const isDebug = true;

const ScholarshipPage = () => {
    const urlParams = useQueryParams();

    const page = parseInt(urlParams.get('page')) || 1;
    const searchQuery = urlParams.get('q') || '';
    
    const dispatch = useDispatch();
    const { scholarships, loading, error } = useSelector((state) => state.scholarships);
    const { totalPage } = useSelector((state) => state.pagination);

    // scholarship filter options
    const items = [
        {
            id: '2eqsa',
            label: 'Location',
            content: ['Phnom Penh', 'Siem Reap']
        },
    ];

    /**
     * useEffect Hook
     *
     * Fetches scholarships based on current page if no search query is provided.
     * If a search query is present, it triggers the search functionality.
     *
     * @param {Function} dispatch - Redux dispatch function
     * @param {number} page - Current page number for pagination
     * @param {string} searchQuery - Current search query
     * @param {boolean} isDebug - Flag for enabling debug logs
     */
    useEffect(() => {
        if (searchQuery === "") {
            (isDebug) ? console.log("ScholarshipPage says : fetchingScholarships...") : null
            dispatch(fetchScholarships({ page }));
        } else {
            (isDebug) ? console.log("ScholarshipPage says : searching...") : null
            dispatch(searchScholarships({ page, query: searchQuery }));
        }
        if (isDebug) {
            console.log("ScholarshipPage says: total page is ", totalPage);
            console.log("ScholarshipPage says: search results are ", scholarships);
        }
    }, [dispatch, page, searchQuery]);

    return (
        <>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {/* {error && <p>{error}</p>} */}
                <Filter items={items}/>
                <SearchBar handleSearch={searchScholarships} searchPlaceholder="Search scholarships..." category="scholarship" />
                <ScholarshipList scholarships={scholarships} />
                <Pagination totalPage={totalPage} currentPage={page} category="scholarship" searchQuery={searchQuery} />
            </ListContainer>
            <Footer />
        </>
    );
};

export default ScholarshipPage;
