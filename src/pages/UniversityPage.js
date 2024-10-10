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

import { setCurrentPage } from '../features/slices/paginationSlice';
import { searchUniversities } from '../features/slices/searchbarSlice';
import { fetchUniversities, setUniversities } from '../features/slices/universitySlice';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);
    const { currentPage, totalPage } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchUniversities({ page: currentPage || 1, limit: 10 }));
    }, [dispatch, currentPage]);    

    async function handleSearch(query) {
        try {
            const data = await searchUniversities(query, "university");
            dispatch(setUniversities([data])); // Directly updating the slice data
            console.log('Fetched Data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {error && <p>{error}</p>}
                <SearchBar handleSearch={handleSearch} dispatchFunction={(data) => dispatch(fetchUniversities(data))} searchPlaceholder="Search universities..." />
                <UniversityList universities={universities} />
                <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={(page) => dispatch(setCurrentPage(page))}/>
            </ListContainer>
            <Footer />
        </div>
    );
};

export default UniversityPage;
