import { useNavigate } from "react-router-dom";
import { Trash, Eye , Check } from "lucide-react";

export const useJobFunctions = () => {
    const navigate = useNavigate();

    const handleView = (id) => {
        console.log("View action triggered for Job with ID:", id);
        navigate(`/detail/job/${id}`);
    };

    const handleApprovePost = (id) => {
        console.log("Approve action triggered for Job with ID:", id);
        // TODO: Implement actual approve functionality
    }

    const JobFunctions = [
        {
            variant: "ghost",
            icon: null,
            label: "View",
            onClick: handleView,
        },
        {
            variant: "ghost",
            icon: <Check/>,
            label: "Approve",
            onClick: handleApprovePost,
        },
    ];

    return {JobFunctions};
};