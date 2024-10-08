// src/pages/UniversityPage.js
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversities } from '../features/slices/universitySlice';
import { LoadingOverlay } from '../components/reusable/Loading';
import UniversityList from '../components/UniversityList';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Pagination from '../components/PaginationRefactor';
import ListContainer from '../components/reusable/ListContainer';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { universities, loading, error, currentPage } = useSelector((state) => state.universities);

    useEffect(() => {
        dispatch(fetchUniversities({ page: currentPage || 1, limit: 10 }));
    }, [dispatch, currentPage]);

    return (
        <div>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {error && <p>{error}</p>}
                <UniversityList universities={universities} />
                <Pagination />
            </ListContainer>
            <Footer />
        </div>
    );
};

export default UniversityPage;
