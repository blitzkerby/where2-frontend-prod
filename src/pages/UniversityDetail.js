// src/pages/UniversityPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversity } from '../features/slices/universitySlice';
import { LoadingOverlay } from '../components/reusable/Loading';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import ListContainer from '../components/reusable/ListContainer';
import Card from '../components/reusable/Card';
import { useParams } from 'react-router-dom';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { university, loading, error } = useSelector((state) => state.universities);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchUniversity(id));
    }, [dispatch, id]);

    return (
        <>
            <Navbar />
            <h1>{id}</h1>
            <ListContainer>
                {loading && <LoadingOverlay />}
                {error && <p>{error}</p>}
                
                {university && (
                    <Card
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
                        route={university.id}
                    />
                )}
            </ListContainer>
            <Footer />
        </>
    );
};

export default UniversityPage;
