"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Card from "./zimo-card/Card"; // Import the Card component

const MapPointerClient = () => {
  const locations: google.maps.LatLngLiteral[] = [
    { lat: 33.6844, lng: 73.0479 },
    { lat: 31.5204, lng: 74.3587 },
    { lat: 24.8607, lng: 67.0011 },
    { lat: 35.9208, lng: 74.3089 },
    { lat: 25.396, lng: 68.3578 },
    { lat: 30.3753, lng: 69.3451 },
    { lat: 34.0151, lng: 71.5249 },
    { lat: 36.2167, lng: 74.6167 },
    { lat: 27.7215, lng: 68.8228 },
    { lat: 32.1617, lng: 75.2043 },
  ];

  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const center = { lat: 33.6844, lng: 73.0479 }; // Default center position

  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={6}>
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              onClick={() => setSelectedLocation(location)} // Handle marker click
            />
          ))}

          {/* Show Card when a marker is clicked */}
          {selectedLocation && (
            <InfoWindow
              position={selectedLocation}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 bg-white rounded-lg shadow-md w-[350px] md:w-[450px]">
                <Card />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPointerClient;


