import Footer from "./reusable/Footer";
import PaginationComponent from './reusable/Pagination';
import FilterComponent from "./reusable/Filter";
import Card from "./reusable/Card";
import React, { useEffect, useState } from 'react';
import Navbar from "./reusable/Navbar";
import { useDispatch, useSelector } from 'react-redux';  // Import hooks from react-redux
import { fetchScholarships } from "../features/slices/scholarshipsSlice";
import { getFavorite } from "../features/slices/favoriteSlice";
import { useLocation } from "react-router-dom";
import { removedIsClicked } from "../features/slices/favoriteSlice";
function useQuery() {
    return new URLSearchParams(useLocation().search);
} 
const ScholarshipList = ({ scholarship }) => {
    const urlParams = useQuery();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
    // console.log("this is isclicked scholarship", isClicked)
    console.log("this is page scholarship",page)
    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({category:"scholarship",page,limit}));
    }, [page]);
    // const dispatch = useDispatch();  // Create a dispatch function
    // const { scholarships, loading, error } = useSelector((state) => state.scholarships);  // Access scholarships data from the store

    // const [currentFilterUni, setCurrentFilterUni] = useState('');

    // Define the items for the FilterComponent here
    // const items = [
    //     {
    //         id: '2132',
    //         label: 'University',
    //         content: ['Western', 'TECHNO', 'AUPP', 'RUPP', 'PARAGON']
    //     },
    //     {
    //         id: '2eqsa',
    //         label: 'Location',
    //         content: ['Phnom Penh', 'Siem Reap']
    //     },
    //     {
    //         id: 'sadsd',
    //         label: 'Status',
    //         content: ['Open', 'Closed']
    //     }
    // ];

    // useEffect(() => {
        // Fetch scholarships when the component mounts
    //     dispatch(fetchScholarships());
    // }, [dispatch]);

    // const handleUniversityFilterChange = (university) => {
    //     setCurrentFilterUni(university);
    // };

    // const filteredScholarships = scholarships.filter(scholarship => 
    //     currentFilterUni === '' ||
    //     (scholarship.university === currentFilterUni) ||
    //     (scholarship.location === currentFilterUni) ||
    //     (scholarship.status === currentFilterUni)
    // );

    // const renderCard = (currentItems) => {
    //     return (
    //         <div className="flex flex-col items-center justify-center gap-6 mt-10 h-max">
    //             {currentItems.map((scholarship, index) => (
    //                 <Card
    //                 key={scholarship.id}
    //                 image={scholarship.image_url}
    //                 imageAlt={scholarship.image_alt}
    //                 title={scholarship.name}
    //                 description={scholarship.description}
    //                 location={scholarship.location}
    //                 deadLine={scholarship.deadLine}
    //                 id={scholarship.id}
    //                 route={`/scholarship/${scholarship.id}`}
    //             />
                
    //             ))}
    //         </div>
    //     );
    // };

    // if (loading) return <div>Loading...</div>;  // Show loading state
    // if (error) return <div>Error fetching scholarships: {error}</div>;  // Show error message

    return (
    <>
        {scholarship.map((scholarship, index) => (
                <Card
                key={scholarship.id}
                image={scholarship.image_url}
                imageAlt={scholarship.image_alt}
                title={scholarship.name}
                description={scholarship.description}
                location={scholarship.location}
                deadLine={scholarship.deadLine}
                id={scholarship.id}
                type={'scholarship'}
                route={`/scholarship/${ scholarship.id }`}
                isHeartClicked={isClicked[scholarship.id]}
            />))
            }
            </>
        // <>
        //     <Navbar />
        //     <div className="mt-[70px]">
        //         <FilterComponent
        //             items={items}  // Pass the defined items to the FilterComponent
        //             onUniversityFilterChange={handleUniversityFilterChange}
        //         />
        //         <PaginationComponent
        //             renderCard={() => renderCard(filteredScholarships)}  // Pass filtered scholarships to render
        //             filteredScholarships={filteredScholarships}
        //         />
        //     </div>
        //     <Footer />
        // </>
    );
}
export default ScholarshipList;