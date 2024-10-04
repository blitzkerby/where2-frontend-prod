// src/pages/UniversityPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversities } from '../features/slices/universitySlice';
import Card from '../components/reusable/Card'; // Make sure you have this import

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);

    useEffect(() => {
        dispatch(fetchUniversities());
    }, [dispatch]);

    return (
        <div>
            <h1>University Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {universities.map((university, index) => (
                    <Card
                        key={index}
                        image={university.image_url}
                        imageAlt={university.image_alt}
                        title={university.name}
                        description={university.description}
                        facebookLink={university.facebook_url}
                        instagramLink={university.instagram_url}
                        telegramLink={university.telegram_url}
                        websiteLink={university.website}
                        location={university.location}
                    />
                ))}
            </ul>
        </div>
    );
};

export default UniversityPage;
