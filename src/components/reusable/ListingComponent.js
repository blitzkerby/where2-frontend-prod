import React, { useState } from "react";
import { Trash, Pen } from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ButtonComponent from "./Button";
import SearchBar from "./SearchBar";
import config from "../../config";

const ListingComponent = ({ title, data, columns, totalItems, additionalStats }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteClick = (id) => {
    // Open confirmation modal and set selected user ID
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      const response = await fetch(config.analytics.deleteUserById(selectedUserId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deactivated');
        // You can remove the deleted user from the UI or refresh the list here
        // Optionally, refetch the data or filter out the deleted user
      } else {
        const error = await response.json();
        console.error('Error deactivating user:', error.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
    } finally {
      // Close the modal and reset the selected user ID
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null); // Clear selected user when modal is closed
  };

  return (
    <section className="w-[90%] mx-[32px] bg-white rounded-lg shadow-lg h-full">
      <div className="w-full flex justify-between items-center px-[128px] py-[64px]">
        <h1 className="text-3xl text-blue-600 font-bold">{title}</h1>
        <div className="flex gap-2 ">
          <SearchBar searchPlaceholder={`Search ${title}`} />
          <div className="bg-gray-600 text-white p-4 rounded-lg w-[160px]">
            <p className="text-sm">Total {title}</p>
            <p className="text-4xl font-bold">{totalItems}</p>
          </div>
          {additionalStats && additionalStats.map((stat, index) => (
            <div key={index} className="bg-blue-600 text-white p-4 rounded-lg w-[160px]">
              <p className="text-sm">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <table className="w-[90%] mx-auto">
        <thead>
          <tr className="text-center h-full">
            {columns.map((column, index) => (
              <th key={index} className="pb-4 ">{column}</th>
            ))}
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
  {data.filter(item => item.isActive).map((item) => (
    <tr key={item.id} className="border-t h-full">
      {columns.map((column, index) => (
        <td key={index} className="py-4 text-center h-full">{item[column]}</td>
      ))}
      <td className="py-4">
        <div className="flex gap-4 justify-center">
          {/* Pass the user ID to the handleDeleteClick function */}
          <ButtonComponent variant="danger" onClick={() => handleDeleteClick(item.id)}>
            <Trash />
          </ButtonComponent>
          <ButtonComponent variant="success">
            <Pen />
          </ButtonComponent>
          <ButtonComponent variant="ghost">View</ButtonComponent>
        </div>
      </td>
    </tr>
  ))}

        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          {/* Pagination buttons */}
          {/* ... (pagination code remains the same) ... */}
        </nav>
      </div>

      <DeleteConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
};

export default ListingComponent;
