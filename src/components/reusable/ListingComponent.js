import React, { useState, useMemo } from "react";
import { Trash, Pen } from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ButtonComponent from "./Button";
import SearchBar from "./SearchBar";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import config from "../../config";

const ListingComponent = ({ title, data, columns, totalItems, additionalStats }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [localData, setLocalData] = useState(data); // Use local state to handle immediate updates

  const handleDeleteClick = (id) => { setSelectedUserId(id); setShowModal(true); };

  const queryClient = useQueryClient();

  // Function to handle the deletion API call
  const deleteUser = async (userId) => {
    const response = await fetch(config.analytics.deleteUserById(userId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error deactivating user');
    }
  
    return response;
  };

  // Mutation setup for deleting users with optimistic updates
  const mutation = useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedUserId) => {
      // Cancel any ongoing query fetching the users to prevent race conditions
      await queryClient.cancelQueries(['users']);

      // Get current data snapshot (before delete)
      const previousUsers = queryClient.getQueryData(['users']);

      // Optimistically update localData by filtering out the deleted user
      setLocalData((prevData) => prevData.filter((user) => user.id !== deletedUserId));

      // Return the previous users so we can revert if needed
      return { previousUsers };
    },
    onError: (error, userId, context) => {
      // Revert the local data if the mutation fails
      setLocalData(context.previousUsers);
      console.error('Error deactivating user:', error.message);
    },
    onSettled: () => {
      // Refetch the data after the mutation completes (whether successful or not)
      queryClient.invalidateQueries(['users']);
    },
  });

  // Handles the confirmation delete process
  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;
    mutation.mutate(selectedUserId);
    setShowModal(false);
    setSelectedUserId(null);
    window.location.reload();

  };

  // Handles closing of the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  // Search and filter the data based on the search term
  const filteredData = useMemo(() => {
    return localData.filter(item => 
      item.isActive && 
      item.role !== "developer" &&
      columns.some(column => 
        item[column] && 
        item[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [localData, columns, searchTerm]);

  return (
    <section className="lg:w-[90%] sm:w-[100%] sm:mr-[32px] lg:ml-[64px] bg-white rounded-lg shadow-lg h-full">
      <div className="flex justify-between items-center py-5 w-[80%] mx-auto">
        <h1 className="text-3xl text-blue-600 font-bold">{title}</h1>
        <div className="flex gap-2 sm:hidden">
          <div className="bg-gray-600 text-white p-4 rounded-lg w-[160px]">
            <p className="text-sm">Total {title}</p>
            <p className="text-4xl font-bold">{filteredData.length}</p>
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
              <th key={index} className="pb-4">{column}</th>
            ))}
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
          {filteredData.map((item) => (
            <tr key={item.id} className="border-t h-full">
  {columns.map((column, index) => (
    <td key={index} className="py-4 text-center h-full truncate max-w-[150px]">
      {item[column]}
    </td>
  ))}
  <td className="py-4">
    <div className="flex gap-4 sm:gap-1 justify-center">
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

      <DeleteConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        warningMsg={"Are you sure you want to delete this item?"}
        type={'Delete'}
      />
    </section>
  );
};

export default ListingComponent;
