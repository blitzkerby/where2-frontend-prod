// src/pages/UniversityPage.js
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversities, fetchUniversity } from '../features/slices/universitySlice';
import { LoadingOverlay } from '../components/reusable/Loading';
import UniversityList from '../components/UniversityList';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';
import Card from '../components/reusable/Card';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { university, loading, error, currentPage } = useSelector((state) => state.universities);

    useEffect(() => {
        dispatch(fetchUniversity(1))
        console.log(university)
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <ListContainer>
                {loading && <LoadingOverlay />}
                {error && <p>{error}</p>}

                    <Card
                        // key={index}
                        image={university.image_url}
                        imageAlt={university.image_alt}
                        title={university.name}
                        description={university.description}
                        facebookLink={university.facebook_url}
                        instagramLink={university.instagram_url}
                        telegramLink={university.telegram_url}
                        websiteLink={university.website}
                        location={university.location}
                        id={university.id}
                        route={"universities"}
                    />

                <Pagination />
            </ListContainer>
            <Footer />
        </div>
    );
};

export default UniversityPage;
