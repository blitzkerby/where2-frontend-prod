import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScholarDetails from '../components/ScholarshipDetail';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import { fetchScholarships } from '../features/slices/scholarshipsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOverlay } from '../components/reusable/Loading';
const ScholarshipDetail = () => {
    const { id } = useParams(); // Get ID from URL

	const dispatch = useDispatch();
	const {scholarships, loading, error} = useSelector((state)=>state.scholarships)
		console.log(id)
    useEffect(() => {
		dispatch(fetchScholarships(id))
    }, [id]);

	

    return (<>
		<Navbar />
		{loading && <LoadingOverlay />}
			{scholarships.map(
				(scholarship)=>(
					<ScholarDetails 
					key={scholarship.id}
					image={scholarship.image_url} 
					description={scholarship.description} 
					title={scholarship.name} 
					websiteLink={scholarship.websiteLink} 
					facebookLink={scholarship.facebookLink} 
					instagramLink={scholarship.instagramLink} 
					twitterLink={scholarship.twitterLink} 
					telegramLink={scholarship.telegramLink} 
			/>
				)
		)}
		{error && <p>{error}</p>}
			<Footer/>
			</>
      
    );
};

export default ScholarshipDetail;
