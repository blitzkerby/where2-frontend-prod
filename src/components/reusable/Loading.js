import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} color={color} className="animate-spin" />
    </div>
  );
};

const LoadingOverlay = ({ message = "Loading...", isFullScreen = false }) => {
  const overlayClasses = isFullScreen
    ? "fixed inset-0 bg-black bg-opacity-50 z-50"
    : "absolute inset-0 bg-white bg-opacity-75";

  return (
    <div className={`${overlayClasses} flex items-center justify-center`}>
      <div className="text-center">
        <LoadingSpinner size={48} className="mb-4" />
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingOverlay }