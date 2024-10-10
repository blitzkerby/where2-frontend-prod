import { useState } from "react";
import axios from "axios";

const useGeolocation = () => {
    const [location, setLocation] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [error, setError] = useState("");
  
    const getLocation = () => {
      setIsGettingLocation(true);
      setError("");
  
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        setIsGettingLocation(false);
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
  
            if (response.data && response.data.display_name) {
              setLocation(response.data.display_name);
            } else {
              setError("Failed to get location");
            }
          } catch (error) {
            setError("Failed to get location");
          } finally {
            setIsGettingLocation(false);
          }
        },
        () => {
          setError("Failed to get location");
          setIsGettingLocation(false);
        }
      );
    };
  
    return { location, getLocation, isGettingLocation, error };
  };
  
  export default useGeolocation;