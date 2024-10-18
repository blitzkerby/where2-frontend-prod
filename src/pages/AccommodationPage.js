import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryParams } from '../hooks/useQueryParams';

import { LoadingOverlay } from '../components/reusable/Loading';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';
import { fetchAllList } from '../features/slices/paginationSlice';

import DetailLayout from '../layouts/DetailLayout';

/** Enable for debugging */
const isDebug = true;

const AccommodationPage = () => {
    const urlParams = useQueryParams();

    const page = parseInt(urlParams.get('page')) || 1;
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    // const { universities, loading, error } = useSelector((state) => state.universities);
    const { data, loading, error, totalPage } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchAllList({page,model: 'Accommodation'}))
    },[dispatch, page])
    return (
        <div>
            <Navbar />
            <ListContainer>
            {loading && <LoadingOverlay/>}
            {error && <p>{error}</p>}
            <DetailLayout accommodations={data} />
            </ListContainer>
            <Pagination totalPage={totalPage} currentPage={page} category='accommodations'/>
            <Footer />
        </div>
    )
};

export default AccommodationPage;