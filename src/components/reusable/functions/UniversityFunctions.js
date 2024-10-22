import { useNavigate } from "react-router-dom";
import { Trash, Eye } from "lucide-react";

export const useUniversityFunctions = () => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        console.log("Delete action triggered for university with ID:", id);
        // TODO: Implement actual delete functionality
    };

    const handleView = (id) => {
        console.log("View action triggered for university with ID:", id);
        navigate(`/detail/university/${id}`);
    };

    const UniversityFunctions = [
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

    return { UniversityFunctions };
};