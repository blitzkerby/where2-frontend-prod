// src/pages/UniversityPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversities } from '../features/slices/universitySlice';
import Card from '../components/reusable/Card'; // Make sure you have this import
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { universities, loading, error } = useSelector((state) => state.universities);

    useEffect(() => {
        dispatch(fetchUniversities());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="max-w-full lg:max-w-[980px] sm:w-[100%] mx-auto gap-[30px] lg:gap-[40px] mt-[248px] lg:mt-[276px] grid sm:px-[35px]">
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
            </div>
            <Footer />
        </div>
    );
};

export default UniversityPage;
