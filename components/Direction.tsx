"use client";

import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Card from "./zimo-card/Card"; // Import the Card component

const Directions = () => {
  const locations: google.maps.LatLngLiteral[] = [
    { lat: 33.6844, lng: 73.0479 }, // Lahore
    { lat: 31.5204, lng: 74.3587 }, // Karachi
    // Other locations...
  ];

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false); // Track if Google Maps API is loaded

  const center = { lat: 33.6844, lng: 73.0479 }; // Default center position

  useEffect(() => {
    if (googleLoaded && locations.length >= 2) {
      const lahore = new google.maps.LatLng(locations[0].lat, locations[0].lng);
      const karachi = new google.maps.LatLng(
        locations[1].lat,
        locations[1].lng
      );

      // Calculate the distance between Lahore and Karachi
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        lahore,
        karachi
      );
      setDistance(dist); // Set the distance (in meters)
    }
  }, [googleLoaded, locations]);

  return (
    <div className="flex">
    <div className="w-full h-screen">
      
        <LoadScript
          googleMapsApiKey={
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
          }
          libraries={["geometry"]}
          onLoad={() => setGoogleLoaded(true)} // Set googleLoaded to true when the API is loaded
        >
          <GoogleMap
            mapContainerClassName="w-[80vw] h-full"
            center={center}
            zoom={6}
          >
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
                <div className="p-2 bg-white rounded-lg shadow-md w-[280px]">
                  <Card />
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <div>
        {/* Display the distance between Lahore and Karachi */}
        {distance && (
          <div className="text-center mt-4">
            <p>
              The distance between Lahore and Karachi is approximately:{" "}
              {Math.round(distance / 1000)} km
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directions;
