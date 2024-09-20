import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

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
                const endDate = new Date().toISOString().split('T')[0];
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 6);
                const startDateString = startDate.toISOString().split('T')[0];
        
                console.log('Fetching visits from:', config.user.visits);
                const response = await axios.get(config.user.visits, {
                    params: { path, startDate: startDateString, endDate }
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
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Visit Tracker for {path}</h2>
            <ul className="space-y-2">
                {visits.length === 0 ? (
                    <li className="text-gray-500">No visits recorded yet.</li>
                ) : (
                    visits.map((visit) => (
                        <li key={visit.id} className="p-4 bg-white rounded border border-gray-300 shadow-sm">
                            {visit.date}: {visit.count} visits
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default VisitTracker;

