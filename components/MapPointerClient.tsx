'use client';  // Ensure this component is treated as a client-side component

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapPointerClient = () => {
  const locations: google.maps.LatLngLiteral[] = [
    { lat: 33.6844, lng: 73.0479 },
    { lat: 31.5204, lng: 74.3587 },
    { lat: 24.8607, lng: 67.0011 },
    { lat: 35.9208, lng: 74.3089 },
    { lat: 25.3960, lng: 68.3578 },
    { lat: 30.3753, lng: 69.3451 },
    { lat: 34.0151, lng: 71.5249 },
    { lat: 36.2167, lng: 74.6167 },
    { lat: 27.7215, lng: 68.8228 },
    { lat: 32.1617, lng: 75.2043 },
  ];

  const center = { lat: 33.6844, lng: 73.0479 }; // Default center position

  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={6}
        >
          {locations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPointerClient;

