import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScholarDetails from '../components/ScholarshipDetail';
import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
const ScholarshipDetail = () => {
    const { id } = useParams(); // Get ID from URL
    const [scholarship, setScholarship] = useState(null);
		console.log(id)
    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/scholarships/${id}`); 
                const data = await response.json();
                setScholarship(data.data);
								console.log(data.data)
            } catch (error) {
                console.error('Error fetching scholarship:', error);
            }
        };

        fetchScholarship();
    }, [id]);

    if (!scholarship) return <div>Loading...</div>; // Show loading state until data is fetched

    return (<>
		<Navbar/>
			{scholarship.map(
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
			<Footer/>
			</>
      
    );
};

export default ScholarshipDetail;
