import Footer from "./reusable/Footer";
import PaginationComponent from './reusable/Pagination';
import FilterComponent from "./reusable/Filter";
import Card from "./reusable/Card";
import React, { useEffect, useState } from 'react';
import Navbar from "./reusable/Navbar";
import { useDispatch, useSelector } from 'react-redux';  // Import hooks from react-redux
import { fetchScholarships } from "../features/slices/scholarshipsSlice";

export default function ScholarshipList() {
    const dispatch = useDispatch();  // Create a dispatch function
    const { scholarships, loading, error } = useSelector((state) => state.scholarships);  // Access scholarships data from the store

    const [currentFilterUni, setCurrentFilterUni] = useState('');

    // Define the items for the FilterComponent here
    const items = [
        {
            id: '2132',
            label: 'University',
            content: ['Western', 'TECHNO', 'AUPP', 'RUPP', 'PARAGON']
        },
        {
            id: '2eqsa',
            label: 'Location',
            content: ['Phnom Penh', 'Siem Reap']
        },
        {
            id: 'sadsd',
            label: 'Status',
            content: ['Open', 'Closed']
        }
    ];

    useEffect(() => {
        // Fetch scholarships when the component mounts
        dispatch(fetchScholarships());
    }, [dispatch]);

    const handleUniversityFilterChange = (university) => {
        setCurrentFilterUni(university);
    };

    const filteredScholarships = scholarships.filter(scholarship => 
        (scholarship.deadLine && (new Date(scholarship.deadLine) - new Date()) >= 30) ||
        currentFilterUni === '' ||
        (scholarship.university === currentFilterUni) ||
        (scholarship.location === currentFilterUni) ||
        (scholarship.status === currentFilterUni)
    );

    const renderCard = (currentItems) => {
        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-10 h-max">
                {currentItems.map((scholarship, index) => (
                    <Card
                        key={index}  // Add a unique key for each card
                        image={scholarship.image_url}  // Adjust according to your data structure
                        imageAlt={scholarship.image_alt}
                        title={scholarship.name}
                        description={scholarship.description}
                        location={scholarship.location}
                        deadLine={scholarship.deadLine}  // Adjust according to your data structure
                        // Map other fields as necessary
                    />
                ))}
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;  // Show loading state
    if (error) return <div>Error fetching scholarships: {error}</div>;  // Show error message

    return (
        <>
            <Navbar />
            <div className="mt-[70px]">
                <FilterComponent
                    items={items}  // Pass the defined items to the FilterComponent
                    onUniversityFilterChange={handleUniversityFilterChange}
                />
                <PaginationComponent
                    renderCard={() => renderCard(filteredScholarships)}  // Pass filtered scholarships to render
                    filteredScholarships={filteredScholarships}
                />
            </div>
            <Footer />
        </>
    );
}
