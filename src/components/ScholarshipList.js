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

    useEffect(() => {
        if (page === 1) {
            dispatch(removedIsClicked());
        }
        dispatch(getFavorite({category:"scholarship",page,limit}));
    }, [page]);

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
        
    );
}
export default ScholarshipList;