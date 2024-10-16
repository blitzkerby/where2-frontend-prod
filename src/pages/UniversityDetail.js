import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversity } from '../features/slices/universitySlice';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import DetailLayout from '../layouts/DetailLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UniversityPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const university = useSelector((state) => state.universities.university);
    const isLoading = useSelector((state) => state.universities.isLoading);

    useEffect(() => {
        dispatch(fetchUniversity(id));

        // async function test(){
        //     const response = await axios.get(`http://127.0.0.1:4000/api/detail/university/1`);
        //     console.log(response)
        // }

        // test()
    }, [dispatch, id]);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <div>
            <Navbar />
            {university && (
                <DetailLayout
                    image={university.image_url}
                    description={university.description}
                    title={university.name}
                    websiteLink={university.website}
                    facebookLink={university.facebook_url}
                    instagramLink={university.instagram_url}
                    twitterLink={university.twitter_url}
                    telegramLink={university.telegram_url}
                />
            )}
            <Footer />
        </div>
    );
};

export default UniversityPage;
