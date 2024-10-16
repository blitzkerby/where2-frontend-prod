import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./../../config";


// THIS COMPONENT IS USED TO PLACE WITHIN A COMPONENT, OR  A POST, IT WILL TRACK THE NUMBER OF RECORDS EACH DAY TO A CERTAIN PATH
const VisitTracker = ({ path }) => {
    const [visits, setVisits] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const trackVisit = async () => {
            try {
                console.log('Tracking visit to:', config.user.visitorTrack);
                await axios.post(config.user.visitorTrack, { path }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log("Visit tracked successfully");
            } catch (error) {
                console.error("Error tracking visit:", error.message, error.config);
                setError("Failed to track visit");
            }
        };

        const fetchVisits = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
        
                console.log('Fetching visits for today:', config.user.visits);
                const response = await axios.get(config.user.visits, {
                    params: { path, startDate: today, endDate: today }
                });
        
                console.log('Response data:', response.data);
        
                if (response.data.success) {
                    setVisits(response.data.visits || []);
                }
            } catch (error) {
                console.error('Error fetching visits:', error.message, error.config);
                setError("Failed to fetch visits");
            }
        };

        trackVisit();
        fetchVisits();
    }, [path]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="py-6">
            <div className="w-full h-full">
                {visits.length === 0 ? (
                    <span className="text-gray-500">No visits recorded yet.</span>
                ) : (
                    visits.map((visit) => (
                        <p key={visit.id} className="w-full h-full text-right p-4 bg-white">
                            Total visits today: {visit.count} visit(s)
                        </p>
                    ))
                )}
            </div>
        </div>
    );
};

export default VisitTracker;
