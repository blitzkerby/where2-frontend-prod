import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryParams } from '../hooks/useQueryParams';
import { fetchUniversities, searchUniversities } from '../features/slices/universitySlice';

import { LoadingOverlay } from '../components/reusable/Loading';

import UniversityList from '../components/UniversityList';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Filter from '../components/reusable/Filter';
import SearchBar from '../components/reusable/SearchBar';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';

/** Enable for debugging */
const isDebug = true;

const UniversityPage = () => {
    const urlParams = useQueryParams();
    const page = parseInt(urlParams.get('page')) || 1;
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);
    const { totalPage } = useSelector((state) => state.pagination);

    const [currentFilterUni, setCurrentFilterUni] = useState('');

    const handleUniversityFilterChange = (university) => {
        setCurrentFilterUni(university);
    };

    const items = [
        {
            id: '2eqsa',
            label: 'Location',
            content: ['Phnom Penh', 'Siem Reap']
        },
        {
            id: 'sadsd',
            label: 'Status',
            content: ['Open', 'Closed']
        }
    ];

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
        if (searchQuery === "") {
            (isDebug) ? console.log("UniversityPage says : fetchingUniversities...") : null
            dispatch(fetchUniversities({ page }));
        } else {
            (isDebug) ? console.log("UniversityPage says : searching...") : null
            dispatch(searchUniversities({ page , query : searchQuery }));
        }

        if (isDebug) {
            console.log("UniversityPage says: total page is ", totalPage);
            console.log("UniversityPage says: search results are ", universities);
        }
    }, [dispatch, page, searchQuery]);

    return (
        <>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {/* {error && <p>{error}</p>} */}
                
                <SearchBar handleSearch={searchUniversities} searchPlaceholder="Search universities..." category="university"/>
                <Filter
                    items={items}
                    onUniversityFilterChange={handleUniversityFilterChange}
                />
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
