"use client";

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 31.5497, // Lahore Latitude
  lng: 74.3436, // Lahore Longitude
};

const GoogleMapComponent: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState<string | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const calculateDistance = async () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    try {
      const originLatLng = await getLatLng(geocoder, origin);
      const destinationLatLng = await getLatLng(geocoder, destination);

      if (!originLatLng || !destinationLatLng) {
        setDistance("Invalid locations.");
        return;
      }

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originLatLng,
          destination: destinationLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result && result.routes.length > 0) {
            const route = result.routes[0];
            if (route.legs.length > 0) {
              setDistance(route.legs[0].distance?.text || "Distance not available.");
              setDirections(result);
            } else {
              setDistance("Route legs not found.");
            }
          } else {
            setDistance("Error calculating distance.");
          }
        }
      );
    } catch (error) {
      console.error("Error fetching location data:", error);
      setDistance("Error fetching location.");
    }
  };

  const getLatLng = (geocoder: google.maps.Geocoder, address: string) => {
    return new Promise<google.maps.LatLng | null>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results.length > 0 && results[0].geometry) {
          resolve(results[0].geometry.location);
        } else {
          reject(null);
        }
      });
    });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={5}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter origin (e.g., Lahore)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Enter destination (e.g., Karachi)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={calculateDistance} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Calculate Distance
        </button>
      </div>

      {distance && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>Distance: {distance}</p>
      )}
    </div>
  );
};

export default GoogleMapComponent;




