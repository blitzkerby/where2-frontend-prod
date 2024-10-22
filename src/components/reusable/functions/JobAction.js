import { useNavigate } from "react-router-dom";
import { Trash, Eye } from "lucide-react";

export const useJobFunctions = () => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        console.log("Delete action triggered for Job with ID:", id);
    };

    const handleView = (id) => {
        console.log("View action triggered for Job with ID:", id);
        navigate(`/detail/job/${id}`);
    };

    const JobFunctions = [
        {
            variant: "danger",
            icon: <Trash />,
            onClick: handleDelete,
            requiresConfirmation: true,
        },
        {
            variant: "ghost",
            icon: null,
            label: "View",
            onClick: handleView,
        },
    ];

    return {JobFunctions};
};