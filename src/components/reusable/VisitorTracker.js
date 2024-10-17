import React from 'react';
import useVisitTracker from './../../hooks/useVisitTracker';
import config from './../../config';

const VisitTracker = ({ path }) => {
  const { visits, error, loading } = useVisitTracker(path, config);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              Total views today: {visit.count} visit(s)
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default VisitTracker;
