"use client";

import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Card from "./zimo-card/Card"; // Import the Card component

const Directions = () => {
  const locations: google.maps.LatLngLiteral[] = [
    { lat: 31.5204, lng: 74.3587 }, // Lahore
    { lat: 24.8607, lng: 67.0011 }, // Karachi
  ];

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false); // Track if Google Maps API is loaded
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const center = { lat: 30.3753, lng: 69.3451 }; // Center on Pakistan

  useEffect(() => {
    if (googleLoaded && locations.length >= 2) {
      const lahore = new google.maps.LatLng(locations[0].lat, locations[0].lng);
      const karachi = new google.maps.LatLng(locations[1].lat, locations[1].lng);

      // Calculate the distance between Lahore and Karachi
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        lahore,
        karachi
      );
      setDistance(dist); // Set the distance (in meters)

      // Request for directions
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: locations[0],
          destination: locations[1],
          travelMode: google.maps.TravelMode.DRIVING, // Driving directions
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [googleLoaded, locations]);

  return (
    <div className="flex">
      <div className="w-full h-screen">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          libraries={["geometry"]}
          onLoad={() => setGoogleLoaded(true)} // Set googleLoaded to true when the API is loaded
        >
          <GoogleMap mapContainerClassName="w-[80vw] h-full" center={center} zoom={6}>
            {/* Render Markers */}
            {locations.map((location, index) => (
              <Marker key={index} position={location} onClick={() => setSelectedLocation(location)} />
            ))}

            {/* Show Card when a marker is clicked */}
            {selectedLocation && (
              <InfoWindow position={selectedLocation} onCloseClick={() => setSelectedLocation(null)}>
                <div className="p-2 bg-white rounded-lg shadow-md w-[280px]">
                  <Card />
                </div>
              </InfoWindow>
            )}

            {/* Show Directions on the Map */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="p-4">
        {/* Display the distance between Lahore and Karachi */}
        {distance && (
          <div className="text-center mt-4">
            <p className="text-lg font-semibold">
              🚗 The distance between Lahore and Karachi is approximately: <b>{Math.round(distance / 1000)} km</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directions;

