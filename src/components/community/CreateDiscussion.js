import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import config from "./../../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useGeolocation from "./../../hooks/useGeolocation";
import { LoadingSpinner } from "./../reusable/Loading";
import DiscussionForm from "./DiscussionForm";
import UserDiscussions from "./UserDiscussion";
import DiscussionList from "./DiscussionList";
import useDiscussions from "../../hooks/useDiscussions";

const CreateDiscussion = ({ showForm }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, entity, userId } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { isGettingLocation, getLocation, error: locationError } = useGeolocation();
    const [formData, setFormData] = useState({
      title: "",
      content: "",
      location: "",
      pathname: location.pathname,
    });
  
    const { discussions, loading: discussionsLoading, error: discussionsError } = useDiscussions(location.pathname);
  
    useEffect(() => {
      if (locationError) {
        setError(locationError);
      }
    }, [locationError]);
  
    useEffect(() => {
      setFormData(prev => ({ ...prev, pathname: location.pathname }));
    }, [location]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleLocationChange = (location) => {
      setFormData((prev) => ({
        ...prev,
        location,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (!formData.title.trim() || !formData.content.trim()) {
        setError("Title and content are required");
        return;
      }
      setIsSubmitting(true);
      try {
        const newDiscussion = {
          id: uuidv4(),
          ...formData,
          author: username ? username : entity,
          userId: userId,
          createdAt: new Date().toISOString(),
          comments: [],
        };
        const response = await axios.post(config.community.createDiscussion, newDiscussion);
        if (response.data.status === "success") {
          setFormData({ title: "", content: "", location: "", pathname: location.pathname });
          navigate("/discussions");
        }
      } catch (err) {
        console.error("Error creating discussion:", err);
        setError(
          err.response?.data?.message ||
          "An error occurred while creating the discussion."
        );
      } finally {
        setIsSubmitting(false);
      }
    };
  
    if (isGettingLocation) {
      return <LoadingSpinner className="h-screen" message="Getting Location..." />;
    }
  
    return (
      <div className="lg:flex lg:gap-6">
        {showForm && (
          <div className="lg:w-2/3 mb-6 lg:mb-0">
            <DiscussionForm
              formData={formData}
              handleChange={handleChange}
              handleLocationChange={handleLocationChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
            />
          </div>
        )}
        <div className="lg:w-1/3 lg:mt-[80px] lg:mb-[16px]">
          <div className="bg-white shadow-md rounded-lg shadow p-6 h-full">
            {discussionsLoading ? (
              <LoadingSpinner message="Loading posts..." />
            ) : discussionsError ? (
              <div className="text-red-500">{discussionsError}</div>
            ) : (
              <DiscussionList discussions={discussions} />
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateDiscussion;