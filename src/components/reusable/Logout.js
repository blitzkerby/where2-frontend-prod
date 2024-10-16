import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from './Button'; 

const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authData');
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div>
      <ButtonComponent onClick={() => setIsOpen(true)} variant="primary">
        Logout
      </ButtonComponent>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <ButtonComponent onClick={() => setIsOpen(false)} variant="secondary">
                Cancel
              </ButtonComponent>
              <ButtonComponent onClick={handleLogout} variant="danger">
                Logout
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;