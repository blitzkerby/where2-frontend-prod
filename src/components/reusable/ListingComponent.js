import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Pen } from "lucide-react";
import DeleteConfirmationModal from "./functions/DeleteConfirmationModal";
import ButtonComponent from "./Button";
import SearchBar from "./SearchBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteUser from "./functions/DeleteUser";

const ListingComponent = ({
  title,
  data,
  columns,
  totalItems,
  additionalStats,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [localData, setLocalData] = useState(data);

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const navigate = useNavigate();
  const handleViewProfile = (id) => {
    navigate(`/user/${id}`);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedUserId) => {
      await queryClient.cancelQueries(["users"]);

      const previousUsers = queryClient.getQueryData(["users"]);

      setLocalData((prevData) =>
        prevData.filter((user) => user.id !== deletedUserId)
      );

      return { previousUsers };
    },
    onError: (error, userId, context) => {
      setLocalData(context.previousUsers);
      console.error("Error deactivating user:", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;
    mutation.mutate(selectedUserId);
    setShowModal(false);
    setSelectedUserId(null);
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const Data = useMemo(() => {
    return localData.filter(
      (item) =>
        item.isActive &&
        item.isVerified &&
        columns.some(
          (column) =>
            item[column] &&
            item[column]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
    );
  }, [localData, columns, searchTerm]);
  console.log("filterd dataaa", Data);

  return (
    <section className="lg:w-full sm:w-[100%] sm:mr-[32px]  bg-white rounded-lg shadow-lg h-full">
      <div className="flex justify-between items-center py-5 w-[80%] mx-auto">
        <h1 className="text-3xl text-blue-600 font-bold">{title}</h1>
        <div className="flex gap-2 sm:hidden">
          <div className="bg-gray-600 text-white p-4 rounded-lg w-[160px]">
            <p className="text-sm">Total {title}</p>
            <p className="text-4xl font-bold">{Data.length}</p>
          </div>
          {additionalStats &&
            additionalStats.map((stat, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white p-4 rounded-lg w-[160px]"
              >
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
              <th key={index} className="pb-4">
                {column}
              </th>
            ))}
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
          {Data.map((item) => (
            <tr key={item.id} className="border-t h-full">
              {columns.map((column, index) => (
                <td
                  key={index}
                  className="py-4 text-center h-full truncate max-w-[150px]"
                >
                  {item[column]}
                </td>
              ))}
              <td className="py-4">
                <div className="flex gap-4 sm:gap-1 justify-center">
                  <ButtonComponent
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash />
                  </ButtonComponent>
                  {title == "USER LISTING" ? null : (
                    <ButtonComponent variant="success">
                      <Pen />
                    </ButtonComponent>
                  )}
                  <ButtonComponent
                    variant="ghost"
                    onClick={() => handleViewProfile(item.id)}
                  >
                    View
                  </ButtonComponent>
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
        type={"Delete"}
      />
    </section>
  );
};

export default ListingComponent;
