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

import { searchUniversities } from '../features/slices/searchbarSlice';
import { fetchUniversities, setUniversities } from '../features/slices/universitySlice';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}  

const UniversityPage = () => {
    const urlParams = useQuery()
    const page = parseInt(urlParams.get('page')) || 1
    const searchQuery = (urlParams.get('q')) || ''
    const limit = parseInt(urlParams.get('limit')) || 10


    console.log("page", page)
    console.log("query", searchQuery)
    console.log("limit", limit)


    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);
    const { totalPage } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchUniversities({ page: page || 1, limit: 10 }));

        console.log(page)
    }, [dispatch, page]);    

    async function handleSearch(query) {
        try {
            // const data = await searchUniversities(query, "university");
            const data = await searchUniversities(query, "university");
            dispatch(setUniversities(data)); 
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
                <Pagination totalPage={totalPage} currentPage={page}/>
            </ListContainer>
            <Footer />
        </div>
    );
};

export default UniversityPage;
