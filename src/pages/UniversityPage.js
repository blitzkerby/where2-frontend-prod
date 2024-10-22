// import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryParams } from '../hooks/useQueryParams';

import { setTotalPage } from '../features/slices/paginationSlice';
import { filterByLocation } from '../features/slices/filterSlice';

import { fetchUniversities, searchUniversities, setUniversities } from '../features/slices/universitySlice';

import { LoadingOverlay } from '../components/reusable/Loading';

import UniversityList from '../components/UniversityList';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Filter from '../components/reusable/Filter';
import SearchBar from '../components/reusable/SearchBar';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';

/** Enable for debugging */
const isDebug = false;

const UniversityPage = () => {
    const urlParams = useQueryParams();

    const page = parseInt(urlParams.get('page')) || 1;
    const location = urlParams.get('location') || '';
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);
    const { totalPage } = useSelector((state) => state.pagination);

    // university filter options
    const items = [
        {
            id: '2eqsa',
            label: 'Location',
            content: ['Phnom Penh', 'Siem Reap']
        },
    ];

    async function filterLocation(){
        const { list , totalPages } = await filterByLocation({ page, location })
        dispatch(setUniversities(list))
        dispatch(setTotalPage(totalPages))
    }

    /**
     * useEffect Hook
     *
     * Fetches universities based on current page if no search query is provided.
     * If a search query is present, it triggers the search functionality.
     *
     * @param {Function} dispatch - Redux dispatch function
     * @param {number} page - Current page number for pagination
     * @param {string} searchQuery - Current search query
     * @param {boolean} isDebug - Flag for enabling debug logs
     */
    useEffect(() => {
        if (searchQuery !== "") {
            dispatch(searchUniversities({ page, query : searchQuery}));
        } else if (location !== "") {
            // dispatch(filterByLocation({ page, location }));
            filterLocation()
        } else {
            dispatch(fetchUniversities({ page }));
        }
    }, [dispatch, page, searchQuery, location]);

    return (
        <>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {/* {error && <p>{error}</p>} */}
                <SearchBar 
                    handleSearch={searchUniversities}
                    searchPlaceholder="Search universities..."
                    category="university"
                />
                <Filter items={items}/>
                <UniversityList universities={universities} />
                <Pagination 
                    totalPage={totalPage} 
                    currentPage={page}
                    category="university"
                    searchQuery={searchQuery}/>
            </ListContainer>
            <Footer />
        </>
    );
};

export default UniversityPage;

