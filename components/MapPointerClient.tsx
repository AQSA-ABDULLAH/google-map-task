"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Card from "./zimo-card/Card"; // Import the Card component

const locations = [
  { id: "1", lat: 33.6844, lng: 73.0479 },
  { id: "2", lat: 31.5204, lng: 74.3587 },
  { id: "3", lat: 24.8607, lng: 67.0011 },
  { id: "4", lat: 35.9208, lng: 74.3089 },
  { id: "5", lat: 25.396, lng: 68.3578 },
  { id: "6", lat: 30.3753, lng: 69.3451 },
  { id: "7", lat: 34.0151, lng: 71.5249 },
  { id: "8", lat: 36.2167, lng: 74.6167 },
  { id: "9", lat: 27.7215, lng: 68.8228 },
  { id: "10", lat: 32.1617, lng: 75.2043 },
];

const MapPointerClient = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    lat: number;
    lng: number;
  } | null>(null);

  const center = { lat: 33.6844, lng: 73.0479 }; // Default center position

  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={6}>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocation(location)} // Store marker data in state
            />
          ))}

          {/* Show Card when a marker is clicked */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 bg-white rounded-lg shadow-md w-[280px]">
                <Card markerId={selectedLocation.id} />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPointerClient;



