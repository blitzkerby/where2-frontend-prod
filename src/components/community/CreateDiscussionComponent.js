import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerComponent from "./../reusable/ContainerComponent";
import useAuth from "./../../hooks/useAuth";
import config from "./../../config";
import axios from "axios";
import { MapPin } from "lucide-react";
import useGeolocation from "./../../hooks/useGeolocation";
import { v4 as uuidv4 } from "uuid";
import UserDiscussions from "./UserDiscussion"
import { LoadingSpinner } from "./../reusable/Loading";
import DiscussionForm from "./DiscussionForm";

const CreateDiscussion = () => {
  const navigate = useNavigate();
  const { username, entity, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    isGettingLocation,
    getLocation,
    error: locationError,
  } = useGeolocation();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
  });

  useEffect(() => {
    if (locationError) {
      setError(locationError);
    }
  }, [locationError]);

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

      const response = await axios.post(
        config.community.createDiscussion,
        newDiscussion
      );

      if (response.data.status === "success") {
        setFormData({ title: "", content: "", location: "" });
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
      <div className="lg:w-1/3 lg:mt-[80px] lg:mb-[16px]">
        <div className="bg-white shadow-md rounded-lg shadow p-6 h-full">
          <UserDiscussions userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussion;
