import React, { useState } from "react";

const LocationDetector = ({ onDetect }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = () => {
    setError(null);
    setLoading(true);
    if (!navigator.geolocation) {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        setError(null);
        const { latitude, longitude } = position.coords;
        console.log("Location detected:", latitude, longitude);
        onDetect(latitude, longitude);
      },
      (geoError) => {
        setLoading(false);
        let msg = "Unable to retrieve your location.";
        if (geoError.code === 1) msg = "Permission denied. Please allow location access.";
        if (geoError.code === 2) msg = "Location unavailable.";
        if (geoError.code === 3) msg = "Location request timed out.";
        setError(msg);
        console.error("Geolocation error:", geoError);
      }
    );
  };

  return (
    <div className="location-detector">
      <button onClick={handleDetect} disabled={loading}>
        {loading ? "Locating..." : "Detect My Location"}
      </button>
      {error && <div className="location-error">{error}</div>}
    </div>
  );
};

export default LocationDetector;